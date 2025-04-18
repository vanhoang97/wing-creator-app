import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function WingCreatorApp() {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("");
  const [style, setStyle] = useState("");
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState("");
  const [script, setScript] = useState("");

  const styles = ["hài hước", "twist bất ngờ", "drama", "bán hàng", "thực tế"];

  const generateIdeas = () => {
    const ideasList = [];
    for (let i = 1; i <= 30; i++) {
      ideasList.push(
        `${i}. [${style.toUpperCase()}] ${audience} đến ${brand} hỏi mua ${product}, và cái kết không ai ngờ`
      );
    }
    setIdeas(ideasList);
    setStep(2);
  };

  const generateScript = (idea) => {
    const base = `Bối cảnh: Shop ${brand} – Khách bước vào\n\n3s đầu: Khách hỏi về ${product}\nGiữa video: Nhân viên hỏi: "Bạn định dùng để làm gì?"\nTwist cuối: Nhân viên đề xuất bất ngờ phù hợp với ${audience}.`;
    setScript(`🎬 Ý tưởng: ${idea}\n\n${base}`);
    setStep(4);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      {step === 1 && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">1️⃣ Giới thiệu về bạn</h2>
            <Input placeholder="Tên thương hiệu (VD: Wing Mobile)" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <select
              className="border rounded px-3 py-2 w-full"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="">Chọn phong cách nội dung</option>
              {styles.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
            <Input placeholder="Sản phẩm chính (VD: iPhone cũ, phụ kiện)" value={product} onChange={(e) => setProduct(e.target.value)} />
            <Input placeholder="Khách hàng mục tiêu (VD: học sinh, mẹ bỉm)" value={audience} onChange={(e) => setAudience(e.target.value)} />
            <Button onClick={generateIdeas}>Tiếp tục ➡️</Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">2️⃣ Chọn ý tưởng</h2>
            {ideas.map((idea, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setSelectedIdea(idea);
                  generateScript(idea);
                }}
              >
                {idea}
              </Button>
            ))}
            <Button variant="ghost" onClick={() => setStep(1)}>⬅️ Quay lại</Button>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">3️⃣ Kịch bản hoàn chỉnh</h2>
            <Textarea rows={10} value={script} readOnly />
            <Button variant="ghost" onClick={() => setStep(2)}>🔁 Chọn ý tưởng khác</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
