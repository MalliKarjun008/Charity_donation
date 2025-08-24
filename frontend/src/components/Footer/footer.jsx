import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Footer() {
  return (
    <footer className="border-t mt-10 bg-stone-400/50 bottom-0">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="font-bold mb-3">ABOUT</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Our charter</a>
            </li>
            <li>
              <a href="#">Stats</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-bold mb-3">SUPPORT</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Our Rules</a>
            </li>
            <li>
              <a href="#">Creator Resources</a>
            </li>
            <li>
              <a href="#">Forward Funds</a>
            </li>
            <li>
              <a href="#">Brand assets</a>
            </li>
          </ul>
        </div>

        {/* More */}
        <div>
          <h3 className="font-bold mb-3">MORE FROM US</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#">Newsletters</a>
            </li>
            <li>
              <a href="#">Project Updates</a>
            </li>
            <li>
              <a href="#">The Creative Independent</a>
            </li>
            <li>
              <a href="#">Mobile apps</a>
            </li>
            <li>
              <a href="#">Research</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t py-6 px-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-6">
        {/* Logo + Copyright */}
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} YourBrand, Inc.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 text-xl text-gray-700">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaYoutube />
          </a>
        </div>

        {/* Language & Currency */}
        <div className="flex gap-3">
          <Select defaultValue="en">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="usd">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">$ US Dollar (USD)</SelectItem>
              <SelectItem value="eur">€ Euro (EUR)</SelectItem>
              <SelectItem value="inr">₹ Indian Rupee (INR)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Policies */}
      <div className="border-t py-4 px-6 text-center text-sm text-gray-500 flex flex-wrap gap-4 justify-center">
        <a href="#">Trust & Safety</a>
        <a href="#">Terms of Use</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Cookie Policy</a>
        <a href="#">Cookie Preferences</a>
        <a href="#">Accessibility Statement</a>
        <a href="#">CA Notice of Consent</a>
      </div>
    </footer>
  );
}
