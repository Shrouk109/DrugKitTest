import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function SearchToggle() {
  const placeholders = [
    "Aspirin",
    "Ibuprofen",
    "Paracetamol",
    "Amoxicillin",
    "Metformin",
    "Lisinopril",
    "Atorvastatin",
    "Omeprazole",
    "Amlodipine",
    "Simvastatin",
    "Hydrochlorothiazide",
    "Losartan",
    "Azithromycin",
    "Furosemide",
    "Prednisone",
    "Warfarin",
    "Tramadol",
    "Ciprofloxacin",
    "Insulin",
    "Levothyroxine",
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <Tabs defaultValue="search" className={"w-full gap-0"}>
      {/* <ScrollArea> */}
      <TabsList className="before:bg-border relative h-auto w-fit gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
        <TabsTrigger
          value="search"
          className="bg-gray-300 overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
        >
          {/* <HouseIcon
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          /> */}
          Find Drug
        </TabsTrigger>
        <TabsTrigger
          value="alternatives"
          className="bg-gray-300 overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none w-max"
        >
          {/* <PanelsTopLeftIcon
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          /> */}
          Alternative
        </TabsTrigger>
      </TabsList>
      {/* <ScrollBar orientation="horizontal" /> */}
      {/* </ScrollArea> */}
      <div className="bg-white p-4 rounded-b-xl rounded-r-xl">
        <TabsContent value="search" className={"flex flex-col gap-4 "}>
          <label className="text-xl font-bold text-gray-700">
            Search for a medicine
          </label>
          <div className="flex w-full items-center gap-2">
            {/* <Input
              type="text"
              placeholder="Search for a medicine or by category..."
              className={"h-12"}
            /> */}

            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
        </TabsContent>
        <TabsContent value="alternatives" className={"flex flex-col gap-4 "}>
          <label className="text-xl font-bold text-gray-700">
            Find drug alternatives
          </label>
          <div className="flex w-full items-center gap-2">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
