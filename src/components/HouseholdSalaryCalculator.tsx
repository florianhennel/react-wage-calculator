import { useState, createContext, useEffect } from "react";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { Skeleton } from "@/components/ui/skeleton";

export interface familyMember {
    id: number;
    name: string;
    grossSalary: number;
    netSalary: number;
    under25: boolean;
    newlyWed: boolean;
    weddingDate: Date | null;
    taxRelief: boolean;
    familyDiscount: boolean;
    dependents: number;
    discountedDependents: 0 | 1 | 2 | 3;
}
export interface MyContextType {
    currentFamilyMember: familyMember;
    setCurrentFamilyMember: (newValue: familyMember) => void;
}

export const CurrentMemberContext = createContext<MyContextType | undefined>(
    undefined
);

const HouseholdSalaryCalculator = () => {
    const defaultFamilyMember: familyMember = {
        id: 0,
        name: "Bendi",
        grossSalary: 250000,
        netSalary: 166250,
        under25: false,
        newlyWed: false,
        weddingDate: null,
        taxRelief: false,
        familyDiscount: false,
        dependents: 0,
        discountedDependents: 0,
    };
    const [currentFamilyMember, setCurrentFamilyMember] =
        useState<familyMember>({
            ...defaultFamilyMember,
        });
    const [familyMembers, setFamilyMembers] = useState<familyMember[]>([
        defaultFamilyMember,
    ]);
    useEffect(() => {
        const index = familyMembers.findIndex(
            (member) => member.id === currentFamilyMember.id
        );
        const updatedFamilyMembers = [...familyMembers];
        updatedFamilyMembers[index] = currentFamilyMember;
        setFamilyMembers(updatedFamilyMembers);
    }, [currentFamilyMember]);
    const updateValue = (newValue: familyMember) => {
        setCurrentFamilyMember(newValue);
    };
    const newMember = () => {
        const newFamilyMember = {
            ...defaultFamilyMember,
            id: familyMembers.length,
        };
        setFamilyMembers([...familyMembers, newFamilyMember]);
        setCurrentFamilyMember(newFamilyMember);
    };
    const deleteCurrentFamilyMember = () => {
        const index = familyMembers.findIndex(
            (member) => member.id === currentFamilyMember.id
        );
        const updatedFamilyMembers = [...familyMembers];
        updatedFamilyMembers.splice(index, 1);
        for (let i = index; i < familyMembers.length - 1; i++) {
            updatedFamilyMembers[i] = { ...familyMembers[i + 1], id: i };
        }
        setFamilyMembers(updatedFamilyMembers);
        setCurrentFamilyMember(updatedFamilyMembers[index]);
    };
    const contextValue: MyContextType = {
        currentFamilyMember: currentFamilyMember,
        setCurrentFamilyMember: updateValue,
    };
    return (
        <CurrentMemberContext.Provider value={contextValue}>
            <header>
                <FamilyMemberTabs
                    family={familyMembers}
                    addFamilyMember={newMember}
                />
            </header>
            <main className="flex justify-center mt-2">
                {familyMembers.length === 0 ? (
                    <Skeleton className="w-1/2 rounded-lg bg-zinc-700 p-4 h-[592px]" />
                ) : (
                    <SalaryCalculator
                        deleteCurrentFamilyMember={deleteCurrentFamilyMember}
                    />
                )}
                <HouseholdSummary family={familyMembers} />
            </main>
        </CurrentMemberContext.Provider>
    );
};

export default HouseholdSalaryCalculator;
