import PlusMinusButton from "./PlusMinusButton";
import { CurrentMemberContext } from "@/components/HouseholdSalaryCalculator";
import { useContext } from "react";
export default function Dependents() {
    const { currentFamilyMember, setCurrentFamilyMember } =
        useContext(CurrentMemberContext)!;
    return (
        <div className="flex flex-row gap-1">
            <PlusMinusButton id="dependents" plusMinus="-" />
            {currentFamilyMember.dependents}
            <PlusMinusButton id="dependents" plusMinus="+" />
            Eltartott, ebből kedvezményezett:
            <PlusMinusButton id="discountedDependents" plusMinus="-" />
            {currentFamilyMember.discountedDependents===3?'3+':currentFamilyMember.discountedDependents}
            <PlusMinusButton id="discountedDependents" plusMinus="+" />
        </div>
    );
}
