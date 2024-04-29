import { CurrentMemberContext } from "@/components/HouseholdSalaryCalculator";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";

interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function NameInput({ onChange }: Props) {
    const { currentFamilyMember, setCurrentFamilyMember } =
        useContext(CurrentMemberContext)!;
    return (
        <>
            <label htmlFor="name">Családtag neve</label>
            <Input
                type="text"
                placeholder={currentFamilyMember.name}
                className=" w-2/3"
                id="name"
                value={currentFamilyMember.name}
                onInput={onChange}
            />
            <div className=" italic font-thin select-none text-sm -mt-2 ml-2 text-zinc-400">Add meg a családtag nevét!</div>
        </>
    );
}
