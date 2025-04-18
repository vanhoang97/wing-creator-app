// File: src/WingCreatorApp.jsx
import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

export default function WingCreatorApp() {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("");
  const [style, setStyle] = useState("Hài hước");
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [selectedIdea, setSelectedIdea] = useState("");
  const [script, setScript] = useState("");
  const [ideas, setIdeas] = useState([]);

  const generateIdeas = () => {
    const newIdeas = Array.from({ length: 30 }, (_, i) =>
      `${i + 1}. ${brand} ra mắt ${product} theo phong cách ${style}`
    );
    setIdeas(newIdeas);
    setStep(2);
  };

  const generateScript = (idea) => {
    const base = `Bối cảnh: ${brand} – Khách bước vào\n\n3s đầu: \"Anh ơi, ${product} này có gì hay?\"\nGiữa video: Nhân viên tư vấn phong cách ${style}.\nTwist cuối: Khách chốt đơn vì quá hợp với ${audience}!`;
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
            <select className="w-full border p-2 rounded" value={style} onChange={(e) => setStyle(e.target.value)}>
              <option>Hài hước</option>
              <option>Cảm động</option>
              <option>Chuyên gia tư vấn</option>
              <option>Drama gây sốc</option>
              <option>Chốt sale gắt</option>
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
