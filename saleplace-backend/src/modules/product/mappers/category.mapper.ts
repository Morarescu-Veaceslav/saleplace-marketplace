import { CategoryModel } from "src/modules/category/models/category.model";

export function normalizeCategory(category: any): CategoryModel | null {
    if (!category) return null;

    return {
        ...category,
        description: category.description ?? '',
        icon: category.icon ?? null,
        children: category.children?.map(normalizeCategory) ?? [],
    }
}
