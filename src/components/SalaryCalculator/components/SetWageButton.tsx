import { CurrentMemberContext } from "@/components/HouseholdSalaryCalculator";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
interface Props{
    number:number,
}
export default function SetWageButton({number}:Props) {
const {currentFamilyMember, setCurrentFamilyMember} = useContext(CurrentMemberContext)!;
    return (
        <Button
            onClick={() =>
                setCurrentFamilyMember({
                    ...currentFamilyMember,
                    grossSalary: currentFamilyMember.grossSalary * (1+(number/100)),
                })
            }
            className=" w-1/6"
        >
            {number}%
        </Button>
    );
}
