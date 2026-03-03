export type NavItem = {
  href: string;
  label: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const docsNav: NavSection[] = [
  {
    title: "FOUNDATIONS",
    items: [
      { href: "/foundations/colors", label: "색상" },
      { href: "/foundations/typography", label: "타이포그래피" },
      { href: "/foundations/spacing", label: "간격" },
    ],
  },
  {
    title: "COMPONENTS",
    items: [
      { href: "/components/accordion", label: "Accordion" },
      { href: "/components/alert", label: "Alert" },
      { href: "/components/alert-dialog", label: "Alert Dialog" },
      { href: "/components/avatar", label: "Avatar" },
      { href: "/components/badge", label: "Badge" },
      { href: "/components/breadcrumb", label: "Breadcrumb" },
      { href: "/components/button", label: "Button" },
      { href: "/components/button-group", label: "Button Group" },
      { href: "/components/card", label: "Card" },
      { href: "/components/checkbox", label: "Checkbox" },
      { href: "/components/combobox", label: "Combobox" },
      { href: "/components/command", label: "Command" },
      { href: "/components/date-picker", label: "Date Picker" },
      { href: "/components/date-range-picker", label: "Date Range Picker" },
      { href: "/components/dialog", label: "Dialog" },
      { href: "/components/dropdown-menu", label: "Dropdown Menu" },
      { href: "/components/empty-state", label: "Empty State" },
      { href: "/components/field", label: "Field" },
      { href: "/components/input", label: "Input" },
      { href: "/components/pagination", label: "Pagination" },
      { href: "/components/popover", label: "Popover" },
      { href: "/components/radio-group", label: "Radio Group" },
      { href: "/components/scroll-area", label: "ScrollArea" },
      { href: "/components/select", label: "Select" },
      { href: "/components/separator", label: "Separator" },
      { href: "/components/sheet", label: "Sheet" },
      { href: "/components/skeleton", label: "Skeleton" },
      { href: "/components/table", label: "Table" },
      { href: "/components/tabs", label: "Tabs" },
      { href: "/components/textarea", label: "Textarea" },
      { href: "/components/toast", label: "Toast" },
      { href: "/components/toggle", label: "Toggle" },
      { href: "/components/tooltip", label: "Tooltip" },
    ],
  },
  {
    title: "GUIDELINES",
    items: [
      { href: "/guidelines/layout-patterns", label: "레이아웃 구성" },
      { href: "/guidelines/data-screen-patterns", label: "데이터 화면 패턴" },
      { href: "/guidelines/content", label: "콘텐츠 가이드" },
      { href: "/guidelines/form-patterns", label: "폼 패턴" },
      { href: "/guidelines/accessibility", label: "접근성" },
    ],
  },
];
