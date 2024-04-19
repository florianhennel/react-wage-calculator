import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useContext, useEffect, useState } from "react";
import { CurrentMemberContext } from "@/components/HouseholdSalaryCalculator";
export default function PickWeddingDate() {
    const {currentFamilyMember,setCurrentFamilyMember} = useContext(CurrentMemberContext)!;
    const [date, setDate] = useState<Date>();
    useEffect(()=>{
        if (currentFamilyMember.weddingDate) {
            setDate(currentFamilyMember.weddingDate);
        }
    },[])
    useEffect(()=>{
        if (date) {
            setCurrentFamilyMember({...currentFamilyMember,weddingDate:date})
        }
    },[date]);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"default"}
                    className={cn(
                        "text-xs h-2/3 font-bold py-1",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Dátum hozzáadása</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
