import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateCategoryInput } from './inputs/CreateCategoryInput';
import { GraphQLError } from 'graphql';
import { UpdateCategoryInput } from './inputs/UpdateCategoryInput';
import { Prisma } from '@prisma/generated';
import { CategoryTreeNode } from './models/category-tree.model';

@Injectable()
export class CategoryService {
    public constructor(private readonly prismaService: PrismaService) { }

    public async create(input: CreateCategoryInput): Promise<boolean> {
        const name = input.name.trim()

        if (!name) {
            throw new GraphQLError('Category name is required', {
                extensions: { code: 'INVALID_INPUT' },
            })
        }

        const parent = input.parentId
            ? await this.getAndValidateParent(input.parentId)
            : null

        const categoryData = {
            ...input,
            name: this.capitalizeTitle(name),
            slug: this.normalizeSlug(name),
            parentId: parent?.id ?? null,
        }

        await this.prismaService.category.create({
            data: categoryData,
        })


        return true
    }

    public async updateCategory(id: string, input: UpdateCategoryInput): Promise<boolean> {

        const category = await this.prismaService.category.findUnique({ where: { id } })
        if (!category) {
            throw new GraphQLError('Category not found', { extensions: { code: 'CATEGORY_NOT_FOUND' } })
        }


        const updateData: Prisma.CategoryUpdateInput = {}

        if (input.name !== undefined) {
            const trimmedName = input.name.trim()
            if (!trimmedName) {
                throw new GraphQLError('Name cannot be empty', { extensions: { code: 'INVALID_FIELD' } })
            }
            if (trimmedName !== category.name) {
                updateData.name = this.capitalizeTitle(trimmedName)
                updateData.slug = this.normalizeSlug(trimmedName)
            }
        }

        if (input.description !== undefined) updateData.description = input.description
        if (input.icon !== undefined) updateData.icon = input.icon

        if (input.isActive !== undefined) {
            if (typeof input.isActive !== 'boolean') {
                throw new GraphQLError('isActive must be a boolean', { extensions: { code: 'INVALID_FIELD' } })
            }
            updateData.isActive = input.isActive
        }

        if (input.parentId !== undefined) {
            const parent = input.parentId ? await this.getAndValidateParent(input.parentId) : null

            updateData.parent = parent
                ? { connect: { id: parent.id } }
                : { disconnect: true }
        }

        await this.prismaService.category.update({
            where: { id },
            data: updateData,
        })

        return true
    }


    public async getAllCategoriesTree(): Promise<CategoryTreeNode[]> {
        const categories = await this.prismaService.category.findMany({
            where: { isActive: true },
            select: {
                id: true,
                name: true,
                slug: true,
                icon: true,
                parentId: true,
            },
            orderBy: { name: 'asc' },
        })

        const map = new Map<string, CategoryTreeNode>()

        for (const cat of categories) {
            map.set(cat.id, {
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                icon: cat.icon,
                children: [],
            })
        }

        const tree: CategoryTreeNode[] = []

        for (const cat of categories) {
            const node = map.get(cat.id)!

            if (cat.parentId) {
                const parent = map.get(cat.parentId)
                if (parent) {
                    parent.children.push(node)
                }
            } else {
                tree.push(node)
            }
        }

        return tree
    }


    private normalizeSlug(text: string): string {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
    }

    private capitalizeTitle(name: string) {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
    }


    private async getAndValidateParent(parentId: string) {
        const parent = await this.prismaService.category.findUnique({
            where: { id: parentId },
            select: { id: true, parentId: true },
        })

        if (!parent) {
            throw new GraphQLError('Parent category not found', {
                extensions: { code: 'CATEGORY_NOT_FOUND' },
            })
        }

        if (parent.parentId !== null) {
            throw new GraphQLError('Only 2 category levels are allowed', {
                extensions: { code: 'MAX_DEPTH' },
            })
        }

        return parent
    }

    
}
