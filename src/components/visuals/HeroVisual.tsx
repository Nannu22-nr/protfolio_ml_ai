import Image from "next/image";

export function HeroVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-[440px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        <Image
          src="/images/portrait.png"
          alt="Portrait of Ohidul Alam"
          fill
          priority
          sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 90vw"
          className="object-cover object-[50%_8%]"
        />
      </div>
    </figure>
  );
}