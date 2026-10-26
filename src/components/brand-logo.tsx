import Image from "next/image";

export default function BrandLogo({ priority = false, sizes = "126px" }: { priority?: boolean; sizes?: string }) {
  return <Image className="brand-logo-image" src="/images/ixir-logo.png" alt="İxir Güzellik" width={425} height={425} sizes={sizes} preload={priority}/>;
}
