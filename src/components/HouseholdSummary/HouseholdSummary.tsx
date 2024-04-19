import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { familyMember } from "../HouseholdSalaryCalculator";
interface Props{
  family:familyMember[],
}

const HouseholdSummary = ({family}:Props) => {
  return (
      <Table className=" w-4/5 ">
      <TableCaption>Háztartás összesített jövedelme</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Családtag</TableHead>
          <TableHead className="text-left">Nettó bér</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-left">
        {family.map((familyMember) => (
          <TableRow key={familyMember.id}>
            <TableCell className=" font-semibold">{familyMember.name}</TableCell>
            <TableCell className="font-thin italic" >{Intl.NumberFormat("hu-HU", {
                        style: "currency",
                        currency: "HUF",
                        maximumFractionDigits: 0,
                    }).format(familyMember.netSalary)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className=" text-left">
          <TableCell>Összesen</TableCell>
          <TableCell >{Intl.NumberFormat("hu-HU", {
                        style: "currency",
                        currency: "HUF",
                        maximumFractionDigits: 0,
                    }).format(family.reduce((prev,current)=>prev+current.netSalary,0))}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default HouseholdSummary;
