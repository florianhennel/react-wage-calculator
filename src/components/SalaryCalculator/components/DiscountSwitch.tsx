import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    id: string;
    text: string;
    checked:boolean,
    click:()=>void,
}

export default function DiscountSwitch({ id, text, checked,click }: Props) {
    const [isChecked, setIsChecked] = useState<boolean>(checked);
    const activate = ()=>{
        click();
        setIsChecked(!isChecked);
    }
    return (
        <div className="flex items-center gap-2 justify-center">
            <Switch
                id={id}
                onClick={activate}
                checked={isChecked}
            ></Switch>
            <Label htmlFor={id}>{text}</Label>
            {isChecked && id === "newlyWed" && (
                <Button className=" text-xs h-2/3 font-bold py-1">
                    Dátum hozzáadása
                </Button>
            )}
        </div>
    );
}
