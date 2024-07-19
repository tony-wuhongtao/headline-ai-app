import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic"

export default function AdminLayout({children}) {
    return (
      <>
        <Nav>
            <NavLink href="/pages/voice/tts">文字转声音</NavLink>
            <NavLink href="/pages/voice/cloneeq">同语言声音克隆</NavLink>
            <NavLink href="/pages/voice/clonemul">跨语言声音克隆</NavLink>
        </Nav>

        <div className="container my-6">
            {children}
        </div>
      </>
    );
  }