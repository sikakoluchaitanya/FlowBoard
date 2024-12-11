import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutations = (mutationsFunctions: any) => {
    const [pending, setPending] = useState(false);
    const apiMutations = useMutation(mutationsFunctions);

    const mutate = (payload: any) => {
        setPending(true);
        return apiMutations(payload)
            .finally(() => setPending(false))
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error;
            });
    };
    
    return { mutate, pending };
}