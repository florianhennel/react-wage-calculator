import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import DiscountSwitch from "./components/DiscountSwitch";
import { CurrentMemberContext } from "../HouseholdSalaryCalculator";
import { useContext } from "react";

export default function SalaryCalculator() {
    const {currentFamilyMember,setCurrentFamilyMember} = useContext(CurrentMemberContext)!;
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentFamilyMember({...currentFamilyMember,[event.target.id]: event.target.value});
      };
    if (currentFamilyMember) {
        return (
            <div className=" flex flex-col w-1/2 items-start rounded-lg bg-zinc-700 p-4 gap-2 text-white">
                <div className=" uppercase font-bold text-2xl">
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
                <Input type="number" placeholder="250.000" id="salary" value={currentFamilyMember.salary} className=" w-2/3" onInput={handleInputChange} />
                <div>Add meg a bruttó béredet!</div>
                <Slider
                    defaultValue={[100]}
                    max={200}
                    step={1}
                    className=" w-2/3"
                />
                <div className="flex flex-row gap-4 justify-center w-2/3">
                    <Button className=" w-1/6">-5%</Button>
                    <Button className=" w-1/6">-1%</Button>
                    <Button className=" w-1/6">+1%</Button>
                    <Button className=" w-1/6">+5%</Button>
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
                    {currentFamilyMember.familyDiscount && (
                        <div>
                            <Button>+</Button>
                            {"3"}
                            <Button>-</Button>Eltartott, ebből kedvezményezett:
                            <Button>+</Button>
                            {"3"}
                            <Button>-</Button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

SalaryCalculator;
