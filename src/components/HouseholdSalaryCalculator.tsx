import { useState, createContext, useEffect } from "react";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

export interface familyMember {
    id: number;
    name: string;
    salary: number;
    under25: boolean;
    newlyWed: boolean;
    weddingDate: Date | null;
    taxRelief: boolean;
    familyDiscount: boolean;
    dependents: number;
}
export interface MyContextType {
    currentFamilyMember: familyMember,
    setCurrentFamilyMember: (newValue: familyMember) => void,
}

export const CurrentMemberContext = createContext<MyContextType|undefined>(undefined);

const HouseholdSalaryCalculator = () => {
    const defaultFamilyMember: familyMember = {
        id: 0,
        name: "Bendi",
        salary: 250000,
        under25: false,
        newlyWed: false,
        weddingDate: null,
        taxRelief: false,
        familyDiscount: false,
        dependents: 0,
    };
    const [currentFamilyMember, setCurrentFamilyMember] = useState<familyMember>({
        ...defaultFamilyMember,
    });
    const [familyMembers, setFamilyMembers] = useState<familyMember[]>([
        defaultFamilyMember,
    ]);
    useEffect(() => {
        const index = familyMembers.findIndex(member => member.id === currentFamilyMember.id);
        const updatedFamilyMembers = [...familyMembers];
        updatedFamilyMembers[index] = currentFamilyMember;
        setFamilyMembers(updatedFamilyMembers);
    }, [currentFamilyMember]);
  const updateValue = (newValue: familyMember) => {
    setCurrentFamilyMember(newValue);
  };


  const contextValue: MyContextType = {
    currentFamilyMember:currentFamilyMember,
    setCurrentFamilyMember: updateValue,
  };
    const newMember = () => {
        setFamilyMembers([
            ...familyMembers,
            { ...defaultFamilyMember, id: familyMembers.length },
        ]);
    };
    return (
        <CurrentMemberContext.Provider value={contextValue} >
            <header>
                <FamilyMemberTabs
                    family={familyMembers}
                    addFamilyMember={newMember}
                />
            </header>
            <main className="flex gap-1 mt-2">
                <SalaryCalculator />
                <HouseholdSummary />
            </main>
        </CurrentMemberContext.Provider>
    );
};

export default HouseholdSalaryCalculator;
