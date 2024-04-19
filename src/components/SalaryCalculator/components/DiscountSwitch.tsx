import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import {
    CurrentMemberContext,
    familyMember,
} from "@/components/HouseholdSalaryCalculator";
import PickWeddingDate from "./PickWeddingDate";
import { calculateWeddingDateEligibility } from "../SalaryCalculator";
interface Props {
    id: string;
    text: string;
}

export default function DiscountSwitch({ id, text }: Props) {
    const { currentFamilyMember, setCurrentFamilyMember } =
        useContext(CurrentMemberContext)!;
    const [isChecked, setIsChecked] = useState<boolean>();
    const [eligible, setEligible] = useState<boolean>(false);
    useEffect(() => {
        switch (id) {
            case "under25":
                setIsChecked(currentFamilyMember.under25);
                break;
            case "newlyWed":
                setIsChecked(currentFamilyMember.newlyWed);
                break;
            case "taxRelief":
                setIsChecked(currentFamilyMember.taxRelief);
                break;
            case "familyDiscount":
                setIsChecked(currentFamilyMember.familyDiscount);
                break;
            default:
                break;
        }
        //setIsChecked(currentFamilyMember[id as keyof familyMember] as boolean)
    }, [
        currentFamilyMember.familyDiscount,
        currentFamilyMember.taxRelief,
        currentFamilyMember.newlyWed,
        currentFamilyMember.under25,
    ]);
    useEffect(() => {
        setEligible(calculateWeddingDateEligibility(currentFamilyMember));
    }, [currentFamilyMember.weddingDate]);
    const activate = () => {
        setCurrentFamilyMember({ ...currentFamilyMember, [id]: !isChecked });
        setIsChecked(!isChecked);
    };
    return (
        <div className="flex items-center gap-2 justify-start">
            <Switch
                id={id}
                onClick={activate}
                checked={
                    currentFamilyMember[id as keyof familyMember] as boolean
                }
            ></Switch>
            <Label className=" min-w-44" htmlFor={id}>
                {text}
            </Label>
            {isChecked && id === "newlyWed" && (
                <>
                    <PickWeddingDate />
                    {currentFamilyMember.weddingDate && (
                        <div
                            className={`rounded-lg text-xs font-bold min-w-20 ${
                                eligible ? "bg-green-400" : "bg-red-800"
                            }`}
                        >
                            {eligible ? "Jogosult" : "Nem jogosult"}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
