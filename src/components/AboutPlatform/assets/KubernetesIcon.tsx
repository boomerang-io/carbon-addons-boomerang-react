import * as React from "react";
import { SVGProps } from "react";

function KubernetesIcon(props: SVGProps<SVGElement>) {
  return (
    // @ts-expect-error TS(2322): Type '{ children: Element[]; className?: string | ... Remove this comment to see the full error message
    <svg viewBox="0 0 32 32" {...props}>
      <title>Kubernetes</title>
      <desc>Kubernetes icon</desc>
      <path
        d="M15.89.476a2.142 2.142 0 0 0-.823.219L3.932 6.01a2.113 2.113 0 0 0-1.15 1.432L.053 19.373A2.096 2.096 0 0 0 .344 21q.058.087.12.168l7.702 9.574a2.133 2.133 0 0 0 1.661.783h12.349a2.133 2.133 0 0 0 1.664-.792l7.696-9.576a2.096 2.096 0 0 0 .41-1.786L29.2 7.43a2.113 2.113 0 0 0-1.15-1.433L16.922.695A2.142 2.142 0 0 0 15.89.476z"
        fill="#326ce5"
      />
      <path
        d="M16.002 4.542a.705.705 0 0 0-.655.74v.187a5.554 5.554 0 0 0 .091.634 6.22 6.22 0 0 1 .066 1.21.727.727 0 0 1-.219.344l-.015.282a8.666 8.666 0 0 0-1.203.185 8.565 8.565 0 0 0-4.353 2.485l-.24-.17a.526.526 0 0 1-.396-.04 6.218 6.218 0 0 1-.897-.81 5.548 5.548 0 0 0-.437-.465 4.412 4.412 0 0 0-.148-.117.793.793 0 0 0-.463-.175.642.642 0 0 0-.53.236.705.705 0 0 0 .163.982c.044.035.098.081.138.112a5.55 5.55 0 0 0 .552.323 6.216 6.216 0 0 1 .998.69.74.74 0 0 1 .133.384l.218.19a8.615 8.615 0 0 0-1.358 6.006l-.28.081a.924.924 0 0 1-.285.288 6.218 6.218 0 0 1-1.195.197 5.572 5.572 0 0 0-.64.05l-.176.041h-.02a.668.668 0 1 0 .297 1.297h.013l.182-.02a5.565 5.565 0 0 0 .598-.218 6.225 6.225 0 0 1 1.161-.34.736.736 0 0 1 .382.135l.29-.05a8.666 8.666 0 0 0 3.841 4.803l-.122.256a.655.655 0 0 1 .059.375 6.506 6.506 0 0 1-.603 1.092 5.578 5.578 0 0 0-.358.533c-.026.05-.059.126-.085.179a.668.668 0 1 0 1.203.57c.026-.053.061-.12.083-.17a5.557 5.557 0 0 0 .192-.612c.177-.437.273-.906.515-1.197a.54.54 0 0 1 .287-.14l.15-.272a8.618 8.618 0 0 0 6.146.015l.133.255a.526.526 0 0 1 .341.206 6.214 6.214 0 0 1 .456 1.12 5.57 5.57 0 0 0 .195.611c.021.05.056.118.083.17a.668.668 0 1 0 1.203-.57c-.027-.052-.061-.128-.088-.179a5.552 5.552 0 0 0-.358-.53 6.223 6.223 0 0 1-.59-1.057.522.522 0 0 1 .068-.4 2.288 2.288 0 0 1-.11-.268 8.666 8.666 0 0 0 3.822-4.82l.284.05a.526.526 0 0 1 .373-.138 6.225 6.225 0 0 1 1.162.34 5.565 5.565 0 0 0 .598.232c.048.013.118.024.173.037h.013a.668.668 0 1 0 .297-1.297c-.057-.013-.138-.035-.195-.046a5.572 5.572 0 0 0-.64-.05 6.216 6.216 0 0 1-1.194-.196.747.747 0 0 1-.288-.289l-.269-.078a8.65 8.65 0 0 0-1.386-5.993l.236-.219a.526.526 0 0 1 .124-.377 6.216 6.216 0 0 1 .992-.697 5.568 5.568 0 0 0 .552-.323c.044-.033.1-.08.146-.118a.67.67 0 1 0-.83-1.041 4.412 4.412 0 0 0-.148.117 5.572 5.572 0 0 0-.437.465 6.236 6.236 0 0 1-.873.824.742.742 0 0 1-.404.043l-.253.181a8.733 8.733 0 0 0-5.535-2.67c0-.09-.013-.249-.015-.297a.526.526 0 0 1-.218-.332 6.231 6.231 0 0 1 .076-1.207 5.554 5.554 0 0 0 .092-.633v-.19a.705.705 0 0 0-.655-.74zm-.834 5.165l-.2 3.494h-.014a.587.587 0 0 1-.933.45l-2.864-2.031a6.86 6.86 0 0 1 3.303-1.8 7.017 7.017 0 0 1 .708-.113zm1.668 0a6.917 6.917 0 0 1 3.989 1.924l-2.839 2.017a.587.587 0 0 1-.954-.452zm-6.72 3.227l2.62 2.339v.015a.587.587 0 0 1-.232 1.009v.01l-3.362.968a6.858 6.858 0 0 1 .973-4.34zm11.752 0a6.987 6.987 0 0 1 1.002 4.328l-3.366-.97v-.013a.587.587 0 0 1-.232-1.008l2.6-2.328zm-6.404 2.52h1.072l.655.832-.238 1.04-.962.462-.965-.463-.227-1.041zm3.435 2.838a.585.585 0 0 1 .135 0l3.467.585a6.867 6.867 0 0 1-2.775 3.494l-1.34-3.245a.59.59 0 0 1 .508-.818zm-5.823.016a.587.587 0 0 1 .53.818v.013l-1.331 3.219A6.895 6.895 0 0 1 9.517 18.9l3.437-.583a.594.594 0 0 1 .115 0zm2.904 1.41a.592.592 0 0 1 .537.308h.013l1.694 3.057a7.024 7.024 0 0 1-.677.19 6.886 6.886 0 0 1-3.757-.195l1.69-3.057a.587.587 0 0 1 .5-.294z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={0.0545825}
      />
    </svg>
  );
}

export default KubernetesIcon;
