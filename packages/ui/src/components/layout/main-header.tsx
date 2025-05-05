import { GalleryVerticalEnd } from "lucide-react";

export const MainHeader = () => {
  return (
    <div className="flex gap-2 justify-start">
      <a href="/" className="flex items-center gap-2 font-medium">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        NEXT-DEMO
      </a>
    </div>
  );
};
// {/* <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
//       <div className="text-lg font-bold">My App</div>
//       <nav>
//         <ul className="flex space-x-4">
//           <li>
//             <a href="/" className="hover:underline">
//               Home
//             </a>
//           </li>
//           <li>
//             <a href="/about" className="hover:underline">
//               About
//             </a>
//           </li>
//           <li>
//             <a href="/contact" className="hover:underline">
//               Contact
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </header> */}
