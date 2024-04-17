import { useState } from "react";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

export interface familyMember {
    id: number;
    name: string;
    salary: number;
    under25: boolean;
    newlywed: boolean;
    weddingDate: Date | null;
    taxRelief: boolean;
    familyDiscount: boolean;
    dependents: number;
}

const HouseholdSalaryCalculator = () => {
    const defaultFamilyMember: familyMember = {
        id: 0,
        name: "Bendi",
        salary: 250000,
        under25: false,
        newlywed: false,
        weddingDate: null,
        taxRelief: false,
        familyDiscount: false,
        dependents: 0,
    };
    const [currentFamilyMember, setCurrentFamilyMember] = useState({
        ...defaultFamilyMember,
    });
    const [familyMembers, setFamilyMembers] = useState<familyMember[]>([
        defaultFamilyMember,
    ]);
    const newMember = () => {
        console.log("newmember");
        setFamilyMembers([
            ...familyMembers,
            { ...defaultFamilyMember, id: familyMembers.length },
        ]);
    };
    const setActiveMember = (id:number)=>{
      const newCurrent = familyMembers.find(m=>m.id===id);
      newCurrent && setCurrentFamilyMember(newCurrent);
    }
    return (
        <>
            <header>
                <FamilyMemberTabs
                    currentMember={currentFamilyMember.id}
                    family={familyMembers}
                    addFamilyMember={newMember}
                    setCurrentMember={setActiveMember}
                />
            </header>
            <main>
                <SalaryCalculator />
                <HouseholdSummary />
            </main>
        </>
    );
};

export default HouseholdSalaryCalculator;
