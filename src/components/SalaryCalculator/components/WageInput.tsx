import { CurrentMemberContext } from "@/components/HouseholdSalaryCalculator";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";

interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function WageInput({ onChange }: Props) {
    const { currentFamilyMember, setCurrentFamilyMember } =
        useContext(CurrentMemberContext)!;
    const [isFocused, setIsFocused] = useState<boolean>(false);
    return (
        <>
            <label htmlFor="grossSalary">Bruttó bér</label>
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
                onInput={onChange}
            />
            <div className=" italic font-thin select-none text-sm -mt-2 ml-2 text-zinc-400">Add meg a bruttó béredet!</div>
        </>
    );
}
