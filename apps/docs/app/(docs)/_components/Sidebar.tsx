"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar as UiSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const foundations = [
  { href: "/foundations/colors", label: "색상" },
  { href: "/foundations/typography", label: "타이포그래피" },
  { href: "/foundations/spacing", label: "간격" },
];

const guidelines = [
  { href: "/guidelines/content", label: "콘텐츠 가이드" },
  { href: "/guidelines/accessibility", label: "접근성" },
];

const components = [
  { href: "/components/button", label: "Button" },
  { href: "/components/badge", label: "Badge" },
  { href: "/components/input", label: "Input" },
  { href: "/components/textarea", label: "Textarea" },
  { href: "/components/checkbox", label: "Checkbox" },
  { href: "/components/radio-group", label: "Radio Group" },
  { href: "/components/tabs", label: "Tabs" },
  { href: "/components/select", label: "Select" },
  { href: "/components/card", label: "Card" },
  { href: "/components/dialog", label: "Dialog" },
];

function NavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} asChild>
        <Link
          href={href}
          onClick={onNavigate}
          className="no-underline text-body-sm text-foreground-80 hover:text-foreground"
        >
          {label}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function Section({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: typeof foundations;
  onNavigate?: () => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              onNavigate={onNavigate}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <UiSidebar>
      <SidebarHeader className="px-5 py-6">
        <div className="text-body-sm font-semibold text-foreground">Style Guide</div>
      </SidebarHeader>
      <SidebarContent className="space-y-6">
        <Section title="Foundations" items={foundations} onNavigate={onNavigate} />
        <Section title="Components" items={components} onNavigate={onNavigate} />
        <Section title="Guidelines" items={guidelines} onNavigate={onNavigate} />
      </SidebarContent>
    </UiSidebar>
  );
}
