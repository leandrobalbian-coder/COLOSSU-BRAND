import { ComingSoon } from "@/components/docs/coming-soon";

export default function Page() {
  return (
    <ComingSoon
      title="Changelog"
      sprint={5}
      description="Releases and breaking changes will be tracked here."
    />
  );
}
