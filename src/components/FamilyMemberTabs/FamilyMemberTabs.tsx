import { useContext, useState } from "react";
import { MyContextType, familyMember } from "../HouseholdSalaryCalculator";
import { Button } from "../ui/button";
import { CurrentMemberContext } from "../HouseholdSalaryCalculator";
interface Props {
    family: familyMember[];
    addFamilyMember: ()=>void;
}
export default function FamilyMemberTabs({
    family,
    addFamilyMember,
}: Props) {
    const {currentFamilyMember,setCurrentFamilyMember} = useContext(CurrentMemberContext)!;

    const handleChange = (id:number) => {
        const newCurrent = family.find(f=>f.id===id);
        newCurrent && setCurrentFamilyMember(newCurrent);
    };
    return (
        <div className="flex rounded-lg bg-zinc-700 p-2 gap-1">
            {family.map((f) => (
                <Button
                    key={f.id}
                    variant={currentFamilyMember?.id === f.id ? "secondary" : "default"}
                    onClick={()=>handleChange(f.id)}
                >
                    {f.name}
                </Button>
            ))}
            <Button variant="default" onClick={addFamilyMember}>
                +
            </Button>
        </div>
    );
}
