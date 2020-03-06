export const authUtility = (oldObj, updateProps) => {
    return{
        ...oldObj,
        ...updateProps
    }
}