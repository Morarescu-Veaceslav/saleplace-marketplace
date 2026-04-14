'use client'

import { useOnlineUsersQuery } from "@/graphql/generated/output"
import { useApolloClient } from "@apollo/client"
import { useEffect } from "react"

export function PresenceListener() {

  const client = useApolloClient()

  const { data } = useOnlineUsersQuery({
    pollInterval: 1000
  })

  useEffect(() => {
    if (!data) return;

    const onlineIds = new Set(data.onlineUsers);

    const cache = client.cache.extract();
    Object.keys(cache).forEach((key) => {
      if (!key.startsWith("UserModel:") && !key.startsWith("PublicUserModel:")) return;

      const userId = key.split(":")[1];
      client.cache.modify({
        id: key,
        fields: {
          isOnline() {
            return onlineIds.has(userId);
          },
        },
      });
    });

  }, [data, client]);

  return null
}