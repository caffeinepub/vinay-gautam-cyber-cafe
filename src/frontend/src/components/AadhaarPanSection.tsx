import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AADHAAR_SERVICES, PAN_SERVICES } from "@/data/services";
import { ExternalLink } from "lucide-react";

interface Props {
  onBook: (service: string) => void;
}

export default function AadhaarPanSection({ onBook }: Props) {
  return (
    <section id="aadhaar-pan" className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="section-heading">🪪 Aadhaar & PAN Services</h2>
          <p className="section-subheading">
            Complete Aadhaar and PAN card services at your doorstep
          </p>
        </div>
        <Tabs defaultValue="aadhaar" className="w-full">
          <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="aadhaar" data-ocid="aadhaar_pan.tab">
              🪪 Aadhaar
            </TabsTrigger>
            <TabsTrigger value="pan" data-ocid="aadhaar_pan.tab">
              💳 PAN Card
            </TabsTrigger>
          </TabsList>
          <TabsContent value="aadhaar">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {AADHAAR_SERVICES.map((s, i) => (
                <div
                  key={s.name}
                  data-ocid={`aadhaar.item.${i + 1}`}
                  className="service-card flex flex-col gap-2"
                >
                  <div className="font-semibold text-sm text-foreground">
                    {s.name}
                  </div>
                  <div className="text-xs text-muted-foreground flex-1">
                    {s.description}
                  </div>
                  <div className="flex gap-2 mt-1">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" /> Official Site
                    </a>
                    <button
                      type="button"
                      onClick={() => onBook(s.name)}
                      data-ocid={`aadhaar.primary_button.${i + 1}`}
                      className="ml-auto text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
                    >
                      Get This Done
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pan">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {PAN_SERVICES.map((s, i) => (
                <div
                  key={s.name}
                  data-ocid={`pan.item.${i + 1}`}
                  className="service-card flex flex-col gap-2"
                >
                  <div className="font-semibold text-sm text-foreground">
                    {s.name}
                  </div>
                  <div className="text-xs text-muted-foreground flex-1">
                    {s.description}
                  </div>
                  <div className="flex gap-2 mt-1">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" /> Official Site
                    </a>
                    <button
                      type="button"
                      onClick={() => onBook(s.name)}
                      data-ocid={`pan.primary_button.${i + 1}`}
                      className="ml-auto text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      Get This Done
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
