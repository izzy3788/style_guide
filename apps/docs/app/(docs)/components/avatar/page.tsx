"use client";

import CodeSnippet from "../../_components/CodeSnippet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const basicCode = `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function BasicAvatar() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="/img/profile.jpg" alt="사용자 아바타" />
        <AvatarFallback>김유나</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>박가은</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/not-found-avatar.png" alt="깨진 이미지 예시" />
        <AvatarFallback>최지수</AvatarFallback>
      </Avatar>
    </div>
  );
}`;

const sizeCode = `import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AvatarSizes() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm"><AvatarFallback>김서연</AvatarFallback></Avatar>
      <Avatar size="md"><AvatarFallback>이민준</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback>박하린</AvatarFallback></Avatar>
      <Avatar size="xl"><AvatarFallback>최도윤</AvatarFallback></Avatar>
    </div>
  );
}`;

const listCode = `import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AvatarList() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Avatar size="sm"><AvatarFallback>김유나</AvatarFallback></Avatar>
        <div>
          <p className="text-body-sm text-[color:var(--gray-900)]">김유나</p>
          <p className="text-caption text-[color:var(--gray-700)]">Product Designer</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar size="sm"><AvatarFallback>이민준</AvatarFallback></Avatar>
        <div>
          <p className="text-body-sm text-[color:var(--gray-900)]">이민준</p>
          <p className="text-caption text-[color:var(--gray-700)]">Frontend Engineer</p>
        </div>
      </div>
    </div>
  );
}`;

export default function AvatarDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Avatar</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          사용자/팀 프로필을 작은 영역에 식별 가능하게 표현하는 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          이미지가 없거나 로드 실패 시에는 이름 첫 글자(한국 기준 성) fallback으로
          대체합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/img/profile.jpg" alt="사용자 아바타" />
              <AvatarFallback>김유나</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>박가은</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="/not-found-avatar.png" alt="깨진 이미지 예시" />
              <AvatarFallback>최지수</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CodeSnippet title="Avatar 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">크기</h2>
        <p className="text-body-sm text-muted-foreground">
          목록 밀도와 강조 수준에 따라 <code>sm / md / lg / xl</code>을 선택합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="flex items-center gap-3">
            <Avatar size="sm">
              <AvatarFallback>김서연</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarFallback>이민준</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>박하린</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <AvatarFallback>최도윤</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CodeSnippet title="Avatar 크기 예시" code={sizeCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">리스트 패턴</h2>
        <p className="text-body-sm text-muted-foreground">
          이름/역할 텍스트와 함께 배치할 때는 아바타 크기를 줄이고 간격을 일정하게
          유지합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>김유나</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-body-sm text-[color:var(--gray-900)]">김유나</p>
                <p className="text-caption text-[color:var(--gray-700)]">
                  Product Designer
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>이민준</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-body-sm text-[color:var(--gray-900)]">이민준</p>
                <p className="text-caption text-[color:var(--gray-700)]">
                  Frontend Engineer
                </p>
              </div>
            </div>
          </div>
        </div>
        <CodeSnippet title="Avatar 리스트 예시" code={listCode} copyable />
      </section>
    </div>
  );
}
