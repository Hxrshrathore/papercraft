'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileDown, Filter } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';

// Dummy Data for Classes, Subjects, and Questions
type Question = {
  id: number;
  text: string;
  difficulty: string;
};

type SubjectQuestions = {
  [subject: string]: Question[];
};

type ClassQuestions = {
  [className: string]: SubjectQuestions;
};

const dummyQuestions: ClassQuestions = {
  "Class 9": {
    "Mathematics": [
      { id: 1, text: "What is the Pythagorean theorem?", difficulty: "Easy" },
      { id: 2, text: "Solve: x^2 - 4x + 4 = 0", difficulty: "Medium" },
      { id: 3, text: "Explain the concept of rational numbers.", difficulty: "Easy" },
      { id: 4, text: "Prove that the square root of 2 is irrational.", difficulty: "Hard" },
      { id: 5, text: "What is the distance formula?", difficulty: "Medium" },
      { id: 6, text: "Define a linear equation and provide examples.", difficulty: "Easy" },
      { id: 7, text: "Calculate the area of a trapezium with given sides.", difficulty: "Medium" },
      { id: 8, text: "What is the significance of Euclid's geometry?", difficulty: "Medium" },
      { id: 9, text: "Explain the concept of congruent triangles.", difficulty: "Easy" },
      { id: 10, text: "Prove: √2 + √3 is an irrational number.", difficulty: "Hard" },
    ],
    "Science": [
      { id: 11, text: "Explain the process of photosynthesis.", difficulty: "Medium" },
      { id: 12, text: "Describe Newton's Laws of Motion.", difficulty: "Hard" },
      { id: 13, text: "What is an atom?", difficulty: "Easy" },
      { id: 14, text: "Explain the water cycle.", difficulty: "Easy" },
      { id: 15, text: "Describe the structure of DNA.", difficulty: "Hard" },
    ],
    "Social Science": [
      { id: 16, text: "What is the significance of the Indian Constitution?", difficulty: "Medium" },
      { id: 17, text: "Explain the causes of the French Revolution.", difficulty: "Hard" },
      { id: 18, text: "Define democracy and its characteristics.", difficulty: "Easy" },
      { id: 19, text: "What is the process of urbanization?", difficulty: "Medium" },
      { id: 20, text: "Discuss the climatic zones of India.", difficulty: "Medium" },
    ],
    "English": [
      { id: 21, text: "Write an essay on the importance of time management.", difficulty: "Medium" },
      { id: 22, text: "Explain the difference between simile and metaphor.", difficulty: "Easy" },
      { id: 23, text: "Analyze the character of Portia in 'The Merchant of Venice.'", difficulty: "Hard" },
      { id: 24, text: "What is the theme of Robert Frost's poem 'The Road Not Taken'?", difficulty: "Medium" },
      { id: 25, text: "Summarize the poem 'Ozymandias.'", difficulty: "Easy" },
    ]
  },
  "Class 10": {
    "Mathematics": [
      { id: 26, text: "Solve: 3x + 7 = 15", difficulty: "Easy" },
      { id: 27, text: "Find the roots of x^2 - 5x + 6 = 0", difficulty: "Medium" },
      { id: 28, text: "Explain trigonometric ratios.", difficulty: "Medium" },
      { id: 29, text: "Prove the Pythagorean identity.", difficulty: "Hard" },
      { id: 30, text: "Define and calculate the area of a circle.", difficulty: "Easy" },
    ],
    "Science": [
      { id: 31, text: "Describe the process of nuclear fusion.", difficulty: "Hard" },
      { id: 32, text: "What is the chemical formula of water?", difficulty: "Easy" },
      { id: 33, text: "Explain the difference between acids and bases.", difficulty: "Medium" },
      { id: 34, text: "Describe how photosynthesis takes place in plants.", difficulty: "Medium" },
      { id: 35, text: "What is Newton's second law of motion?", difficulty: "Medium" },
    ],
    "Social Science": [
      { id: 36, text: "Explain the importance of the Indian freedom struggle.", difficulty: "Medium" },
      { id: 37, text: "What were the causes of World War II?", difficulty: "Hard" },
      { id: 38, text: "Define secularism and its importance in India.", difficulty: "Easy" },
      { id: 39, text: "Explain the role of UNO.", difficulty: "Medium" },
      { id: 40, text: "What are the types of natural vegetation in India?", difficulty: "Medium" },
    ],
    "English": [
      { id: 41, text: "Write a letter to your friend inviting them to your birthday party.", difficulty: "Easy" },
      { id: 42, text: "Analyze the theme of the poem 'The Brook.'", difficulty: "Medium" },
      { id: 43, text: "What is the role of Macbeth's ambition in his downfall?", difficulty: "Hard" },
      { id: 44, text: "Summarize the story 'The Necklace.'", difficulty: "Easy" },
      { id: 45, text: "Write a persuasive essay on the importance of education.", difficulty: "Medium" },
    ]
  },
  "Class 11": {
    "Physics": [
      { id: 46, text: "Define displacement and distance.", difficulty: "Easy" },
      { id: 47, text: "Explain Newton’s second law of motion.", difficulty: "Medium" },
      { id: 48, text: "What is kinetic energy?", difficulty: "Easy" },
      { id: 49, text: "Derive the formula for gravitational potential energy.", difficulty: "Hard" },
      { id: 50, text: "Define and explain circular motion.", difficulty: "Medium" },
    ],
    "Chemistry": [
      { id: 51, text: "Define atomic structure.", difficulty: "Easy" },
      { id: 52, text: "Explain covalent bonding with an example.", difficulty: "Medium" },
      { id: 53, text: "What is Avogadro's law?", difficulty: "Medium" },
      { id: 54, text: "Describe the process of electrolysis.", difficulty: "Hard" },
      { id: 55, text: "Explain the periodic trends in the periodic table.", difficulty: "Medium" },
    ],
    "Biology": [
      { id: 56, text: "Describe the structure of DNA.", difficulty: "Hard" },
      { id: 57, text: "What are enzymes and their functions?", difficulty: "Medium" },
      { id: 58, text: "Define osmosis and diffusion.", difficulty: "Easy" },
      { id: 59, text: "What is photosynthesis and its importance?", difficulty: "Easy" },
      { id: 60, text: "Explain the human digestive system.", difficulty: "Medium" },
    ]
  },
  "Class 12": {
    "Physics": [
      { id: 61, text: "Explain the concept of electric fields.", difficulty: "Hard" },
      { id: 62, text: "Define Ohm's law and its applications.", difficulty: "Medium" },
      { id: 63, text: "What is electromagnetic induction?", difficulty: "Medium" },
      { id: 64, text: "Discuss the properties of light.", difficulty: "Medium" },
      { id: 65, text: "Explain wave-particle duality.", difficulty: "Hard" },
    ],
    "Chemistry": [
      { id: 66, text: "What is the concept of moles and molar mass?", difficulty: "Easy" },
      { id: 67, text: "Explain the pH scale.", difficulty: "Easy" },
      { id: 68, text: "Describe chemical kinetics and rate of reaction.", difficulty: "Hard" },
      { id: 69, text: "What are oxidation and reduction reactions?", difficulty: "Medium" },
      { id: 70, text: "Define the law of mass action.", difficulty: "Medium" },
    ],
    "Biology": [
      { id: 71, text: "Explain the process of DNA replication.", difficulty: "Hard" },
      { id: 72, text: "What is the theory of evolution by natural selection?", difficulty: "Medium" },
      { id: 73, text: "Describe the structure of the human heart.", difficulty: "Easy" },
      { id: 74, text: "Explain the concept of homeostasis.", difficulty: "Medium" },
      { id: 75, text: "Discuss the role of hormones in the human body.", difficulty: "Medium" },
    ],
    "English": [
      { id: 76, text: "Write a critical analysis of 'Pride and Prejudice.'", difficulty: "Hard" },
      { id: 77, text: "What is the impact of metaphors in poetry?", difficulty: "Medium" },
      { id: 78, text: "Write a descriptive essay on your favorite place.", difficulty: "Easy" },
      { id: 79, text: "Discuss the main themes in 'Hamlet.'", difficulty: "Hard" },
      { id: 80, text: "Write a short story on an unforgettable day.", difficulty: "Medium" },
    ]
  }
};


// Replace with your logo's PNG image file URL
const logoUrl = '/logo.png';

export default function QuestionSelectionPage() {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  useEffect(() => {
    if (selectedClass && selectedSubject) {
      setFilteredQuestions(dummyQuestions[selectedClass][selectedSubject] || []);
    } else if (selectedClass) {
      const allQuestions = Object.values(dummyQuestions[selectedClass] || {}).flat();
      setFilteredQuestions(allQuestions);
    } else {
      setFilteredQuestions([]);
    }
  }, [selectedClass, selectedSubject]);

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setSelectedSubject(''); 
  };

  const handleQuestionToggle = (questionId: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  const handleDownload = async () => {
    const pdfDoc = await PDFDocument.create();
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const logoImageBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    const logoDims = logoImage.scale(0.05);

    const selectedQuestionTexts = filteredQuestions
      .filter((q) => selectedQuestions.includes(q.id))
      .map((q) => q.text); // Only question text, no difficulty

    let yPosition = pageHeight - 50;
    let page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Header with Logo and Organization Info
    page.drawImage(logoImage, {
      x: 50,
      y: yPosition - logoDims.height,
      width: logoDims.width,
      height: logoDims.height,
    });

    page.drawText("BK science coaching Centree", {
      x: pageWidth / 2 - font.widthOfTextAtSize("BK science coaching Centre", 14) / 2,
      y: yPosition - 10,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

    yPosition -= logoDims.height + 10;
    page.drawText(`Subject: ${selectedSubject}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Class: ${selectedClass}`, {
      x: pageWidth - 100,
      y: yPosition,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    // Title and Separator
    yPosition -= 30;
    page.drawText("Quiz Questions", {
      x: 50,
      y: yPosition,
      size: 18,
      font,
      color: rgb(0, 0, 0),
    });

    yPosition -= 10;
    page.drawLine({
      start: { x: 50, y: yPosition },
      end: { x: pageWidth - 50, y: yPosition },
      thickness: 1,
      color: rgb(0.2, 0.2, 0.2),
    });

    yPosition -= 20;

    // Add questions with improved layout
    selectedQuestionTexts.forEach((text, index) => {
      if (yPosition < 60) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - 80;
      }
      page.drawText(`${index + 1}. ${text}`, {
        x: 50,
        y: yPosition,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      yPosition -= 25;
    });

    // Watermark
    const watermarkText = "BK science coaching Centre";
    page.drawText(watermarkText, {
      x: pageWidth / 4,
      y: pageHeight / 4,
      size: 50,
      font,
      color: rgb(0.9, 0.9, 0.9),
      opacity: 0.40,
      rotate: degrees(45),
    });

    // Save and trigger download
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'selected-questions.pdf';
    link.click();
  };

  return (
    
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Filter className="mr-2" /> Filters
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 mb-1">
              Class
            </label>
            <Select onValueChange={handleClassChange} value={selectedClass}>
              <SelectTrigger id="class-select">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(dummyQuestions).map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <Select onValueChange={setSelectedSubject} value={selectedSubject} disabled={!selectedClass}>
              <SelectTrigger id="subject-select">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {selectedClass &&
                  Object.keys(dummyQuestions[selectedClass]).map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Question Selection</h1>
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <Card key={question.id}>
              <CardContent className="flex items-center p-4">
                <Checkbox
                  id={`question-${question.id}`}
                  checked={selectedQuestions.includes(question.id)}
                  onCheckedChange={() => handleQuestionToggle(question.id)}
                  className="mr-4"
                />
                <div className="flex-1">
                  <label
                    htmlFor={`question-${question.id}`}
                    className="text-sm font-medium leading-none"
                  >
                    {question.text}
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Difficulty: {question.difficulty}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Button
            onClick={handleDownload}
            disabled={selectedQuestions.length === 0}
            className="w-full"
          >
            <FileDown className="mr-2" />
            Download Selected Questions
          </Button>
        </div>
      </main>
    </div>
  );
}
