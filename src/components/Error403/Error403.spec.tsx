import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Error403 from "./Error403";

test("render Error403 with defaults", async () => {
    const { getByText } = render(<Error403 />);
    (expect(getByText("403 Access Forbidden")) as any).toBeInTheDocument();
    (expect(getByText(`Looks like you've taken a wrong turn.`)) as any).toBeInTheDocument();
    (expect(getByText("You shouldn’t be here - contact the local authorities if you disagree.")) as any).toBeInTheDocument();
});

test("render Error403 without text", async () => {
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
    const { queryByText } = render(<Error403 header={null} title={null} message={null}/>);
    (expect(queryByText("403 Access Forbidden")).not as any).toBeInTheDocument();
    (expect(queryByText(`Looks like you've taken a wrong turn.`)).not as any).toBeInTheDocument();
    (expect(queryByText("You shouldn’t be here - contact the local authorities if you disagree.")).not as any).toBeInTheDocument();
});

test("render Error403 with custom text", async () => {
    const { getByText } = render(<Error403 header="hello" title="there" message="sir"/>);
    (expect(getByText("hello")) as any).toBeInTheDocument();
    (expect(getByText("there")) as any).toBeInTheDocument();
    (expect(getByText("sir")) as any).toBeInTheDocument();
});
