import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export const LoadingButton = ({
    isSubmitting,
    loadingText,
    children
}: {
    isSubmitting: boolean,
    loadingText: string,
    children: React.ReactNode
}) => {
    return (
        <Button disabled={isSubmitting} type="submit" className="gap-x-2">
            {isSubmitting ? <Loader2 className="animate-spin" size={"18"} /> : null}
            {isSubmitting ? loadingText : children}
        </Button>
    );
}