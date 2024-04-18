import { useContext, useState } from "react";
import { familyMember } from "../HouseholdSalaryCalculator";
import { Button } from "../ui/button";
import { CurrentMemberContext } from "../HouseholdSalaryCalculator";
interface Props {
    family: familyMember[];
    addFamilyMember: ()=>void;
    setCurrentMember: (id:number)=>void,
}
export default function FamilyMemberTabs({
    family,
    addFamilyMember,
    setCurrentMember,
}: Props) {
    const currentFamilyMember = useContext(CurrentMemberContext);
    return (
        <div className="flex rounded-lg bg-zinc-700 p-2 gap-1">
            {family.map((f) => (
                <Button
                    key={f.id}
                    variant={currentFamilyMember?.id === f.id ? "secondary" : "default"}
                    onClick={()=>setCurrentMember(f.id)}
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
