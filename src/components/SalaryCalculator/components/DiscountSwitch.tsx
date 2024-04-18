import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { CurrentMemberContext, familyMember } from "@/components/HouseholdSalaryCalculator";

interface Props {
    id: string;
    text: string;
}

export default function DiscountSwitch({ id, text }: Props) {

    const {currentFamilyMember,setCurrentFamilyMember} = useContext(CurrentMemberContext)!;
    const [isChecked, setIsChecked] = useState<boolean>(currentFamilyMember[id as keyof familyMember] as boolean);
    const activate = ()=>{
        setCurrentFamilyMember({...currentFamilyMember,[id]:!isChecked});
        setIsChecked(!isChecked);
    }
    return (
        <div className="flex items-center gap-2 justify-center">
            <Switch
                id={id}
                onClick={activate}
                checked={currentFamilyMember[id as keyof familyMember] as boolean}
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
