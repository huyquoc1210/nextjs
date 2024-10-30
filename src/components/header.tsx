import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/mode-toggle";
import { AccountResType } from "@/schemaValidations/account.schema";
import Link from "next/link";

interface HeaderProps {
  user: AccountResType["data"] | null;
}

const Header = (props: HeaderProps) => {
  const { user } = props;

  return (
    <>
      <ul className="flex space-x-4">
        <li>
          <Link href={"/products"}>Sản phẩm</Link>
        </li>

        {user ? (
          <>
            <li>
              <div>
                Xin chào <strong>{user.name}</strong>
              </div>
            </li>
            <li>
              <ButtonLogout />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>Đăng nhập</Link>
            </li>
            <li>
              <Link href={"/register"}>Đăng ký</Link>
            </li>
          </>
        )}
      </ul>
      <ModeToggle />
    </>
  );
};

export default Header;
