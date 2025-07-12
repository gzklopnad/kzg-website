import { useTranslation } from 'react-i18next';

import { Briefcase, Truck, Globe, Settings, HelpCircle, CheckCircle } from 'lucide-react';

const Services = () => {
    // i18n translation
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className=" px-6 py-12 space-y-16 bg-secondary">

            {/* Header */}
            <div className=" ">
            <h2 className="text-6xl font-extraboldbold text-left text-shadow-xs text-shadow-lightest">Our Services</h2>
            <h2 className="text-4xl italic font-extralight text-left ">What we offer</h2>

            </div>
            {/* Service Pillars */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                    {
                        icon: <Globe className="w-8 h-8 text-emerald" />,
                        title: "Global Shipping",
                        subtitle: "Sea and rail freight across continents",
                        bullets: [
                            "Wide network of trusted carriers",
                            "Route planning and compliance",
                            "Cost-effective long-haul logistics"
                        ],
                    },
                    {
                        icon: <Truck className="w-8 h-8 text-emerald" />,
                        title: "Rail Freight Coordination",
                        subtitle: "Efficient inland freight across EU & Asia",
                        bullets: [
                            "Real-time scheduling",
                            "Multi-country documentation",
                            "Customs and depot handling"
                        ],
                    },
                    {
                        icon: <Settings className="w-8 h-8 text-emerald" />,
                        title: "Custom Logistics Solutions",
                        subtitle: "Tailored routing and operations",
                        bullets: [
                            "Flexible planning by shipment",
                            "Business-specific logistics models",
                            "Scalable coordination tools"
                        ],
                    },
                ].map(({ icon, title, subtitle, bullets }) => (
                    <div key={title} className="border p-6 rounded-xl shadow hover:shadow-md transition">
                        <div className="mb-4">{icon}</div>
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <p className="text-gray-600 mb-2">{subtitle}</p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {bullets.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;



