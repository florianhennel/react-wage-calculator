import { Button } from "@/components/ui/button";
import { CurrentMemberContext, familyMember } from "@/components/HouseholdSalaryCalculator";
import { useContext, useEffect, useState } from "react";

interface Props{
    id:string,
    plusMinus:'+'|'-',
}
export default function PlusMinusButton({id,plusMinus}:Props){
    const { currentFamilyMember, setCurrentFamilyMember } =
        useContext(CurrentMemberContext)!;
        const [isDisabled,setIsDisabled] = useState<boolean>();
    const handleClick = ()=>{
        
        if (plusMinus === '+') {
            if(id === "dependents"){
                setCurrentFamilyMember({...currentFamilyMember,[id]:currentFamilyMember.dependents+1})
            }else{
                setCurrentFamilyMember({...currentFamilyMember,[id]:currentFamilyMember.discountedDependents+1})
            }
        }else{
            if(id === "dependents"){
                setCurrentFamilyMember({...currentFamilyMember,[id]:currentFamilyMember.dependents-1})
            }else{
                setCurrentFamilyMember({...currentFamilyMember,[id]:currentFamilyMember.discountedDependents-1})
            }
        }
        
    }
    useEffect(()=>{
        if (id==="dependents" && plusMinus === '-') {
            setIsDisabled(currentFamilyMember.dependents === 0);
        }else if(id === "discountedDependents"){
            setIsDisabled(currentFamilyMember.discountedDependents === ((plusMinus === '+')?3:0));
        }
    },[currentFamilyMember.dependents,currentFamilyMember.discountedDependents])
    return (<Button onClick={handleClick} className=" w-2 h-2 rounded-full p-3" disabled={isDisabled}>{plusMinus}</Button>)
}