import { familyMember } from "../HouseholdSalaryCalculator";
import { Button } from "../ui/button";
interface Props {
    currentMember: number;
    family: familyMember[];
    addFamilyMember: ()=>void;
    setCurrentMember: (id:number)=>void,
}
export default function FamilyMemberTabs({
    currentMember,
    family,
    addFamilyMember,
    setCurrentMember,
}: Props) {
    return (
        <div className="flex rounded-lg bg-cyan-900 p-2 gap-1">
            {family.map((f) => (
                <Button
                    key={f.id}
                    variant={currentMember === f.id ? "secondary" : "default"}
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
