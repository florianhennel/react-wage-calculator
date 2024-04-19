import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import DiscountSwitch from "./components/DiscountSwitch";
import {
    CurrentMemberContext,
    familyMember,
} from "../HouseholdSalaryCalculator";
import { useContext, useEffect, useState } from "react";
import Dependents from "./components/Dependents";

export const calculateWeddingDateEligibility = (
    currentFamilyMember: familyMember
) => {
    if (currentFamilyMember.newlyWed && currentFamilyMember.weddingDate) {
        const now = new Date();
        const millisecondsInYear: number = 1000 * 60 * 60 * 24 * 365.25;

        const weddingYear = currentFamilyMember.weddingDate.getFullYear();
        const weddingMonth = currentFamilyMember.weddingDate.getMonth();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        return (
            Math.abs(
                currentFamilyMember.weddingDate.getTime() - now.getTime()
            ) /
                millisecondsInYear <
                2 &&
            (weddingYear < currentYear ||
                (weddingYear === currentYear && weddingMonth < currentMonth))
        );
    }
    return false;
};
interface Props{
    deleteCurrentFamilyMember:()=>void,
}
export default function SalaryCalculator( {deleteCurrentFamilyMember}:Props ) {
    const { currentFamilyMember, setCurrentFamilyMember } =
        useContext(CurrentMemberContext)!;
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        if (id === "grossSalary") {
            setCurrentFamilyMember({
                ...currentFamilyMember,
                [id]: formatNumber(value),
            });
        } else {
            setCurrentFamilyMember({
                ...currentFamilyMember,
                [id]: value,
            });
        }
    };
    const formatNumber = (value: string) => {
        return Number(value.replace(/[^\d]/g, ""));
    };

    const calculateNetSalary = (gross: number) => {
        let newlyWed = 0;
        let familyDiscount = 0;
        let tax: number = gross * 0.185;
        if (currentFamilyMember.under25) {
            const overflow = gross - 499952;
            tax += overflow > 0 ? overflow * 0.15 : 0;
        } else {
            tax += gross * 0.15;
        }
        if (currentFamilyMember.taxRelief) {
            tax = tax > 77300 ? tax - 77300 : 0;
        }
        if (calculateWeddingDateEligibility(currentFamilyMember)) {
            newlyWed += 5000;
        }
        if (
            currentFamilyMember.familyDiscount &&
            currentFamilyMember.dependents > 0 &&
            currentFamilyMember.dependents >=
                currentFamilyMember.discountedDependents
        ) {
            switch (currentFamilyMember.discountedDependents) {
                case 1:
                    familyDiscount += 10000 * currentFamilyMember.dependents;
                    break;
                case 2:
                    familyDiscount += 20000 * currentFamilyMember.dependents;
                    break;
                case 3:
                    familyDiscount += 33000 * currentFamilyMember.dependents;
                    break;
                default:
                    break;
            }
        }
        return gross - tax + newlyWed + familyDiscount;
    };
    useEffect(() => {
        setCurrentFamilyMember({
            ...currentFamilyMember,
            netSalary: calculateNetSalary(currentFamilyMember.grossSalary),
        });
    }, [
        currentFamilyMember.grossSalary,
        currentFamilyMember.dependents,
        currentFamilyMember.discountedDependents,
        currentFamilyMember.familyDiscount,
        currentFamilyMember.newlyWed,
        currentFamilyMember.taxRelief,
        currentFamilyMember.under25,
        currentFamilyMember.weddingDate,
    ]);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [sliderValue,setSliderValue] = useState([100]);
    const [defaultGrossSalary,setDefaultGrossSalary] = useState<number>(currentFamilyMember.grossSalary);
    useEffect(()=>{
        setCurrentFamilyMember({...currentFamilyMember,grossSalary:defaultGrossSalary*(sliderValue[0]/100)})
    },[sliderValue]);
    if (currentFamilyMember) {
        return (
            <div className=" flex flex-col w-1/2 items-start rounded-lg bg-zinc-700 p-4 gap-2 text-white">
                <TrashIcon className=" place-self-end h-6 w-6 -mr-3" onClick={deleteCurrentFamilyMember} />
                <div className=" uppercase font-bold text-2xl -mt-6">
                    {currentFamilyMember.name} bérének kiszámítása
                </div>
                <div className="">Családtag neve</div>
                <Input
                    type="text"
                    placeholder={currentFamilyMember.name}
                    className=" w-2/3"
                    id="name"
                    value={currentFamilyMember.name}
                    onInput={handleInputChange}
                />
                <div>Add meg a családtag nevét!</div>
                <div>Bruttó bér</div>
                <Input
                    type="text"
                    placeholder={Intl.NumberFormat("hu-HU", {
                        style: "currency",
                        currency: "HUF",
                        maximumFractionDigits: 0,
                    }).format(currentFamilyMember.grossSalary)}
                    id="grossSalary"
                    value={
                        isFocused
                            ? Intl.NumberFormat("hu-HU").format(
                                  currentFamilyMember.grossSalary
                              )
                            : ""
                    }
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className=" w-2/3"
                    onInput={handleInputChange}
                />
                <div>Add meg a bruttó béredet!</div>
                <Slider
                    value={sliderValue}
                    max={200}
                    step={1}
                    className=" w-2/3"
                    onValueChange={setSliderValue}
                />
                <div className="flex flex-row gap-4 justify-center w-2/3">
                    <Button
                        onClick={() =>
                            setCurrentFamilyMember({
                                ...currentFamilyMember,
                                grossSalary:
                                    currentFamilyMember.grossSalary * 0.95,
                            })
                        }
                        className=" w-1/6"
                    >
                        -5%
                    </Button>
                    <Button
                        onClick={() =>
                            setCurrentFamilyMember({
                                ...currentFamilyMember,
                                grossSalary:
                                    currentFamilyMember.grossSalary * 0.99,
                            })
                        }
                        className=" w-1/6"
                    >
                        -1%
                    </Button>
                    <Button
                        onClick={() =>
                            setCurrentFamilyMember({
                                ...currentFamilyMember,
                                grossSalary:
                                    currentFamilyMember.grossSalary * 1.01,
                            })
                        }
                        className=" w-1/6"
                    >
                        +1%
                    </Button>
                    <Button
                        onClick={() =>
                            setCurrentFamilyMember({
                                ...currentFamilyMember,
                                grossSalary:
                                    currentFamilyMember.grossSalary * 1.05,
                            })
                        }
                        className=" w-1/6"
                    >
                        +5%
                    </Button>
                </div>
                <div className=" uppercase font-bold text-base">
                    kedvezmények
                </div>
                <div className="flex flex-col w-2/3 gap-2 items-start">
                    <DiscountSwitch
                        id="under25"
                        text="25 év alattiak SZJA mentessége"
                    />
                    <DiscountSwitch
                        id="newlyWed"
                        text="Friss házasok kedvezménye"
                    />
                    <DiscountSwitch
                        id="taxRelief"
                        text="Személyi adókedvezmény"
                    />
                    <DiscountSwitch
                        id="familyDiscount"
                        text="Családi kedvezmény"
                    />
                    {currentFamilyMember.familyDiscount && <Dependents />}
                </div>
                <div className=" self-center place-self-end">
                    <div>Számított nettó bér</div>
                    <div className=" rounded-xl bg-zinc-800 px-3 py-2">
                        {Intl.NumberFormat("hu-HU", {
                            style: "currency",
                            currency: "HUF",
                            maximumFractionDigits: 0,
                        }).format(currentFamilyMember.netSalary)}
                    </div>
                </div>
            </div>
        );
    }
}
