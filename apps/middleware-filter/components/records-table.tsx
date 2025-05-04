import { ChevronDown, Trophy, Calendar, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";

// Simulate a data fetching function with a delay
async function getRecords() {
  // Sample data of obscure world records
  const records = [
    {
      id: 1,
      title: "Most Toilet Seats Broken by Head in One Minute",
      recordHolder: "Kevin Shelley",
      year: 2007,
      category: "Strength",
      description:
        "Kevin Shelley broke 46 toilet seats over his head in one minute.",
      location: "Germany",
    },
    {
      id: 2,
      title: "Longest Time to Hold Breath Underwater",
      recordHolder: "Aleix Segura Vendrell",
      year: 2016,
      category: "Endurance",
      description:
        "Aleix Segura Vendrell held his breath underwater for 24 minutes and 3.45 seconds.",
      location: "Spain",
    },
    {
      id: 3,
      title: "Most Spoons Balanced on Face",
      recordHolder: "Abolfazl Salehi Nezhad",
      year: 2009,
      category: "Balance",
      description:
        "Abolfazl Salehi Nezhad balanced 85 spoons on his face simultaneously.",
      location: "Iran",
    },
    {
      id: 4,
      title: "Fastest Time to Type the Alphabet Backwards",
      recordHolder: "Vinay Kumar",
      year: 2012,
      category: "Speed",
      description: "Vinay Kumar typed the alphabet backwards in 3.43 seconds.",
      location: "India",
    },
    {
      id: 5,
      title: "Longest Duration Spinning a Basketball on a Toothbrush",
      recordHolder: "Thaneshwar Guragai",
      year: 2018,
      category: "Skill",
      description:
        "Thaneshwar Guragai spun a basketball on a toothbrush for 1 minute and 8.15 seconds.",
      location: "Nepal",
    },
    {
      id: 6,
      title: "Most Dice Stacked on Cat's Paw",
      recordHolder: "Bibi the Cat",
      year: 2021,
      category: "Animals",
      description: "Bibi the cat had 10 dice stacked on her paw by her owner.",
      location: "Malaysia",
    },
    {
      id: 7,
      title: "Longest Time to Balance on One Foot",
      recordHolder: "Arulanantham Suresh Joachim",
      year: 1997,
      category: "Endurance",
      description:
        "Arulanantham Suresh Joachim balanced on one foot for 76 hours and 40 minutes.",
      location: "Sri Lanka",
    },
    {
      id: 8,
      title: "Most Watermelons Sliced on Stomach in One Minute",
      recordHolder: "Ashrita Furman",
      year: 2010,
      category: "Danger",
      description:
        "Ashrita Furman had 26 watermelons sliced on his stomach in one minute.",
      location: "USA",
    },
    {
      id: 9,
      title: "Longest Fingernails on a Pair of Hands",
      recordHolder: "Shridhar Chillal",
      year: 2018,
      category: "Body",
      description:
        "Shridhar Chillal's fingernails measured a combined length of 909.6 cm (29 ft 10.1 in).",
      location: "India",
    },
    {
      id: 10,
      title: "Most Apples Crushed with Bicep in One Minute",
      recordHolder: "Linsey Lindberg",
      year: 2013,
      category: "Strength",
      description:
        "Linsey Lindberg crushed 8 apples with her bicep in one minute.",
      location: "USA",
    },
    {
      id: 11,
      title: "Fastest Time to Arrange a Chess Set",
      recordHolder: "Alik Gershon",
      year: 2009,
      category: "Speed",
      description: "Alik Gershon arranged a chess set in 30.31 seconds.",
      location: "Israel",
    },
    {
      id: 12,
      title: "Most Socks Put On One Foot in 30 Seconds",
      recordHolder: "Silvio Sabba",
      year: 2012,
      category: "Speed",
      description: "Silvio Sabba put on 43 socks on one foot in 30 seconds.",
      location: "Italy",
    },
  ];

  // Simulate a 2-second delay to demonstrate loading state
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return records;
}

// Helper function to ensure array format for query params
function ensureArray(param: string | string[] | undefined): string[] {
  if (!param) return [];
  return Array.isArray(param) ? param : [param];
}

export async function RecordsTable({
  searchParams,
  basePath,
}: {
  searchParams: {
    category?: string | string[];
    year?: string | string[];
    holder?: string | string[];
  };
  basePath: string;
}) {
  // Fetch records with simulated delay
  const records = await getRecords();

  // Parse query parameters
  const categoryFilters = ensureArray(searchParams.category);
  const yearFilters = ensureArray(searchParams.year).map((y) =>
    Number.parseInt(y)
  );
  const holderFilters = ensureArray(searchParams.holder);

  // Filter records based on query parameters
  const filteredRecords = records.filter((record) => {
    // Apply category filter
    if (
      categoryFilters.length > 0 &&
      !categoryFilters.includes(record.category)
    ) {
      return false;
    }

    // Apply year filter
    if (yearFilters.length > 0 && !yearFilters.includes(record.year)) {
      return false;
    }

    // Apply record holder filter
    if (
      holderFilters.length > 0 &&
      !holderFilters.includes(record.recordHolder)
    ) {
      return false;
    }

    return true;
  });

  // Get unique categories, years, and record holders for filters
  const categories = [...new Set(records.map((record) => record.category))];
  const years = [...new Set(records.map((record) => record.year))].sort(
    (a, b) => b - a
  );
  const recordHolders = [
    ...new Set(records.map((record) => record.recordHolder)),
  ];

  // Helper function to create URL with updated query params
  function createQueryUrl(params: Record<string, any>) {
    // Create a new URLSearchParams object
    const searchParams = new URLSearchParams();

    // Start with current params
    if (categoryFilters.length > 0) {
      categoryFilters.forEach((cat) => searchParams.append("category", cat));
    }

    if (yearFilters.length > 0) {
      yearFilters.forEach((year) =>
        searchParams.append("year", year.toString())
      );
    }

    if (holderFilters.length > 0) {
      holderFilters.forEach((holder) => searchParams.append("holder", holder));
    }

    // Update with new params
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        // Remove all instances of this key
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        // First remove all existing values for this key
        searchParams.delete(key);
        // Then add each value
        value.forEach((v) => searchParams.append(key, v.toString()));
      } else {
        // Add or replace single value
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  }

  // Helper function to toggle a filter value
  function toggleFilter(key: string, value: string | number) {
    const currentValues =
      key === "year"
        ? ensureArray(searchParams[key as keyof typeof searchParams]).map((v) =>
            Number.parseInt(v as string)
          )
        : ensureArray(searchParams[key as keyof typeof searchParams]);

    const stringValue = value.toString();

    if (currentValues.includes(value as never)) {
      return createQueryUrl({
        [key]:
          currentValues.filter((v) => v !== value).length > 0
            ? currentValues.filter((v) => v !== value)
            : null,
      });
    } else {
      return createQueryUrl({ [key]: [...currentValues, stringValue] });
    }
  }

  // Clear all filters
  function clearFiltersUrl() {
    return "/";
  }

  return (
    <div className="bg-white rounded-[2px]">
      <div className="p-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex gap-2 h-9 px-4 rounded-[2px] border-[color:var(--nordic-200)] text-[color:var(--nordic-700)] hover:bg-[color:var(--nordic-50)] hover:text-[color:var(--nordic-900)]"
                  >
                    <Trophy className="h-4 w-4 text-[color:var(--nordic-500)]" />
                    Category
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56 rounded-[2px] border-[color:var(--nordic-200)]"
                >
                  {categories.map((category) => (
                    <a
                      key={category}
                      href={toggleFilter("category", category)}
                      className="block"
                    >
                      <DropdownMenuCheckboxItem
                        checked={categoryFilters.includes(category)}
                        className="cursor-pointer"
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    </a>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex gap-2 h-9 px-4 rounded-[2px] border-[color:var(--nordic-200)] text-[color:var(--nordic-700)] hover:bg-[color:var(--nordic-50)] hover:text-[color:var(--nordic-900)]"
                  >
                    <Calendar className="h-4 w-4 text-[color:var(--nordic-500)]" />
                    Year
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56 rounded-[2px] border-[color:var(--nordic-200)]"
                >
                  {years.map((year) => (
                    <a
                      key={year}
                      href={toggleFilter("year", year)}
                      className="block"
                    >
                      <DropdownMenuCheckboxItem
                        checked={yearFilters.includes(year)}
                        className="cursor-pointer"
                      >
                        {year}
                      </DropdownMenuCheckboxItem>
                    </a>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex gap-2 h-9 px-4 rounded-[2px] border-[color:var(--nordic-200)] text-[color:var(--nordic-700)] hover:bg-[color:var(--nordic-50)] hover:text-[color:var(--nordic-900)]"
                  >
                    <User className="h-4 w-4 text-[color:var(--nordic-500)]" />
                    Record Holder
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56 max-h-[300px] overflow-y-auto rounded-[2px] border-[color:var(--nordic-200)]"
                >
                  {recordHolders.map((holder) => (
                    <a
                      key={holder}
                      href={toggleFilter("holder", holder)}
                      className="block"
                    >
                      <DropdownMenuCheckboxItem
                        checked={holderFilters.includes(holder)}
                        className="cursor-pointer"
                      >
                        {holder}
                      </DropdownMenuCheckboxItem>
                    </a>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {(categoryFilters.length > 0 ||
                yearFilters.length > 0 ||
                holderFilters.length > 0) && (
                <a href={clearFiltersUrl()}>
                  <Button
                    variant="ghost"
                    className="h-9 px-3 text-[color:var(--nordic-500)] hover:text-[color:var(--nordic-900)] hover:bg-transparent"
                  >
                    Clear
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-1">
            {categoryFilters.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="rounded-[2px] bg-[color:var(--nordic-50)] text-[color:var(--nordic-700)] border-[color:var(--nordic-200)] hover:bg-[color:var(--nordic-100)] px-3 py-1"
              >
                {category}
                <a
                  href={toggleFilter("category", category)}
                  className="ml-2 text-[color:var(--nordic-400)] hover:text-[color:var(--nordic-700)] cursor-pointer"
                >
                  ×
                </a>
              </Badge>
            ))}
            {yearFilters.map((year) => (
              <Badge
                key={year}
                variant="outline"
                className="rounded-[2px] bg-[color:var(--nordic-50)] text-[color:var(--nordic-700)] border-[color:var(--nordic-200)] hover:bg-[color:var(--nordic-100)] px-3 py-1"
              >
                {year}
                <a
                  href={toggleFilter("year", year)}
                  className="ml-2 text-[color:var(--nordic-400)] hover:text-[color:var(--nordic-700)] cursor-pointer"
                >
                  ×
                </a>
              </Badge>
            ))}
            {holderFilters.map((holder) => (
              <Badge
                key={holder}
                variant="outline"
                className="rounded-[2px] bg-[color:var(--nordic-50)] text-[color:var(--nordic-700)] border-[color:var(--nordic-200)] hover:bg-[color:var(--nordic-100)] px-3 py-1"
              >
                {holder}
                <a
                  href={toggleFilter("holder", holder)}
                  className="ml-2 text-[color:var(--nordic-400)] hover:text-[color:var(--nordic-700)] cursor-pointer"
                >
                  ×
                </a>
              </Badge>
            ))}
          </div>

          <div className="border-t border-b border-[color:var(--nordic-100)]">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="text-[color:var(--nordic-500)] font-normal">
                    Title
                  </TableHead>
                  <TableHead className="text-[color:var(--nordic-500)] font-normal">
                    Record Holder
                  </TableHead>
                  <TableHead className="text-[color:var(--nordic-500)] font-normal">
                    Year
                  </TableHead>
                  <TableHead className="text-[color:var(--nordic-500)] font-normal">
                    Category
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-[color:var(--nordic-500)] font-normal">
                    Location
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-[color:var(--nordic-500)]"
                    >
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map((record) => (
                    <TableRow
                      key={record.id}
                      className="border-[color:var(--nordic-100)] hover:bg-[color:var(--nordic-50)]"
                    >
                      <TableCell className="font-medium text-[color:var(--nordic-800)]">
                        <div>
                          {record.title}
                          <p className="text-sm text-[color:var(--nordic-500)] hidden sm:block mt-1">
                            {record.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-[color:var(--nordic-700)]">
                        {record.recordHolder}
                      </TableCell>
                      <TableCell className="text-[color:var(--nordic-700)]">
                        {record.year}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="rounded-[2px] border-[color:var(--nordic-200)] text-[color:var(--nordic-600)] font-normal"
                        >
                          {record.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-[color:var(--nordic-700)]">
                        {record.location}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="text-sm text-[color:var(--nordic-500)]">
            Showing {filteredRecords.length} of {records.length} records
          </div>
        </div>
      </div>
    </div>
  );
}
