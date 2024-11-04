'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Book, Download } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont, degrees } from 'pdf-lib';

// Dummy data for questions
// Dummy questions for testing
const dummyQuestions = [
  // Class 9 - Mathematics
  { id: 1, text: "What is the Pythagorean theorem?", marks: 2, difficulty: "Easy", type: "Objective", subject: "Mathematics", class: "9", options: ["a² + b² = c²", "a + b = c", "a² = b² + c²", "a² - b² = c²"] },
  { id: 2, text: "Solve for x: 3x + 4 = 19.", marks: 3, difficulty: "Medium", type: "Objective", subject: "Mathematics", class: "9", options: ["x = 5", "x = 7", "x = 3", "x = 6"] },
  { id: 3, text: "Prove that the square root of 2 is irrational.", marks: 5, difficulty: "Hard", type: "Subjective", subject: "Mathematics", class: "9" },
  { id: 4, text: "What is the formula for the area of a triangle?", marks: 2, difficulty: "Easy", type: "Objective", subject: "Mathematics", class: "9", options: ["1/2 * base * height", "base * height", "2 * base * height", "base + height"] },
  { id: 5, text: "Explain the concept of irrational numbers.", marks: 4, difficulty: "Medium", type: "Subjective", subject: "Mathematics", class: "9" },

  // Class 9 - Science
  { id: 6, text: "What is photosynthesis?", marks: 2, difficulty: "Easy", type: "Objective", subject: "Science", class: "9", options: ["Conversion of light to energy", "Process of breathing", "Breaking down food", "Digesting food"] },
  { id: 7, text: "Explain Newton's First Law of Motion.", marks: 5, difficulty: "Hard", type: "Subjective", subject: "Science", class: "9" },
  { id: 8, text: "What is the chemical symbol for water?", marks: 1, difficulty: "Easy", type: "Objective", subject: "Science", class: "9", options: ["H₂O", "O₂", "CO₂", "H₂"] },
  { id: 9, text: "Describe the structure of an atom.", marks: 4, difficulty: "Medium", type: "Subjective", subject: "Science", class: "9" },
  { id: 10, text: "Define osmosis.", marks: 2, difficulty: "Easy", type: "Objective", subject: "Science", class: "9", options: ["Movement of water", "Movement of molecules", "Process of mixing", "Process of digestion"] },

  // Class 10 - Mathematics
  { id: 11, text: "What is the Quadratic Formula?", marks: 3, difficulty: "Medium", type: "Objective", subject: "Mathematics", class: "10", options: ["x = (-b ± √(b² - 4ac)) / 2a", "x = (b ± √(b² + 4ac)) / 2a", "x = (-b ± 4ac) / 2a", "x = b ± √(b² - 4ac)"] },
  { id: 12, text: "Explain the steps for solving quadratic equations.", marks: 6, difficulty: "Hard", type: "Subjective", subject: "Mathematics", class: "10" },
  { id: 13, text: "What is the value of π (Pi)?", marks: 1, difficulty: "Easy", type: "Objective", subject: "Mathematics", class: "10", options: ["3.14", "2.71", "1.62", "1.41"] },
  { id: 14, text: "What are the properties of parallelograms?", marks: 4, difficulty: "Medium", type: "Subjective", subject: "Mathematics", class: "10" },
  { id: 15, text: "Calculate the perimeter of a rectangle with length 8 cm and width 5 cm.", marks: 2, difficulty: "Easy", type: "Objective", subject: "Mathematics", class: "10", options: ["26 cm", "30 cm", "20 cm", "24 cm"] },

  // Class 10 - Science
  { id: 16, text: "Define atomic number.", marks: 2, difficulty: "Easy", type: "Objective", subject: "Science", class: "10", options: ["Number of protons", "Number of electrons", "Atomic weight", "Number of neutrons"] },
  { id: 17, text: "What are Newton's three laws of motion?", marks: 6, difficulty: "Hard", type: "Subjective", subject: "Science", class: "10" },
  { id: 18, text: "Name the process by which plants make food.", marks: 1, difficulty: "Easy", type: "Objective", subject: "Science", class: "10", options: ["Photosynthesis", "Respiration", "Fermentation", "Osmosis"] },
  { id: 19, text: "Describe the water cycle.", marks: 4, difficulty: "Medium", type: "Subjective", subject: "Science", class: "10" },
  { id: 20, text: "What is the pH scale?", marks: 3, difficulty: "Medium", type: "Objective", subject: "Science", class: "10", options: ["0 to 14", "0 to 7", "7 to 14", "-1 to 1"] },

  // Class 11 - Physics
  { id: 21, text: "Define velocity.", marks: 2, difficulty: "Easy", type: "Objective", subject: "Physics", class: "11", options: ["Rate of change of displacement", "Rate of change of distance", "Rate of change of speed", "Rate of change of position"] },
  { id: 22, text: "Explain the concept of force.", marks: 5, difficulty: "Hard", type: "Subjective", subject: "Physics", class: "11" },
  { id: 23, text: "What is the SI unit of force?", marks: 1, difficulty: "Easy", type: "Objective", subject: "Physics", class: "11", options: ["Newton", "Joule", "Watt", "Pascal"] },
  { id: 24, text: "Describe the principles of projectile motion.", marks: 6, difficulty: "Hard", type: "Subjective", subject: "Physics", class: "11" },
  { id: 25, text: "Calculate acceleration given initial and final velocity.", marks: 3, difficulty: "Medium", type: "Objective", subject: "Physics", class: "11", options: ["a = (v - u) / t", "a = u + v / t", "a = (u - v) / t", "a = u / v"] },

  // Class 11 - Chemistry
  { id: 26, text: "What is an element?", marks: 2, difficulty: "Easy", type: "Objective", subject: "Chemistry", class: "11", options: ["Pure substance", "Mixture", "Solution", "Compound"] },
  { id: 27, text: "Describe the structure of an atom.", marks: 5, difficulty: "Hard", type: "Subjective", subject: "Chemistry", class: "11" },
  { id: 28, text: "Define molar mass.", marks: 2, difficulty: "Easy", type: "Objective", subject: "Chemistry", class: "11", options: ["Mass per mole", "Moles per mass", "Molar volume", "Molar density"] },
  { id: 29, text: "Explain the concept of covalent bonding.", marks: 4, difficulty: "Medium", type: "Subjective", subject: "Chemistry", class: "11" },
  { id: 30, text: "What is Avogadro's number?", marks: 3, difficulty: "Medium", type: "Objective", subject: "Chemistry", class: "11", options: ["6.022 x 10²³", "3.14 x 10²³", "6.022 x 10²⁴", "1.602 x 10⁻¹⁹"] },

  // Class 12 - Biology
  { id: 31, text: "Define DNA.", marks: 3, difficulty: "Medium", type: "Objective", subject: "Biology", class: "12", options: ["Genetic material", "Protein", "Lipid", "Carbohydrate"] },
  { id: 32, text: "Explain the process of DNA replication.", marks: 5, difficulty: "Hard", type: "Subjective", subject: "Biology", class: "12" },
  { id: 33, text: "What is photosynthesis?", marks: 2, difficulty: "Easy", type: "Objective", subject: "Biology", class: "12", options: ["Conversion of light energy", "Production of proteins", "Creation of ATP", "Water absorption"] },
  { id: 34, text: "Describe the structure and function of enzymes.", marks: 6, difficulty: "Hard", type: "Subjective", subject: "Biology", class: "12" },
  { id: 35, text: "List the components of the human cell.", marks: 4, difficulty: "Medium", type: "Subjective", subject: "Biology", class: "12" },

  // Class 12 - English
  { id: 36, text: "Analyze the theme of 'The Road Not Taken' by Robert Frost.", marks: 4, difficulty: "Medium", type: "Subjective", subject: "English", class: "12" },
  { id: 37, text: "What is a metaphor?", marks: 2, difficulty: "Easy", type: "Objective", subject: "English", class: "12", options: ["Figure of speech", "A literal statement", "Historical fact", "Mathematical term"] },
  { id: 38, text: "Explain the use of symbolism in 'To Kill a Mockingbird'.", marks: 5, difficulty: "Hard", type: "Subjective", subject: "English", class: "12" },
  { id: 39, text: "Define and provide examples of similes.", marks: 3, difficulty: "Medium", type: "Objective", subject: "English", class: "12", options: ["Comparison using 'like' or 'as'", "Direct statement", "Comparison using 'is'", "Unrelated phrase"] },
  { id: 40, text: "Write a short essay on the theme of ambition in 'Macbeth'.", marks: 6, difficulty: "Hard", type: "Subjective", subject: "English", class: "12" },
];



export default function QuestionPaperGenerator() {
  const [isAutomaticMode, setIsAutomaticMode] = useState(true);
  const [examName, setExamName] = useState('');
  const [includeRoughSpace, setIncludeRoughSpace] = useState(false);
  const [headerText, setHeaderText] = useState('KIIT University');
  const [instructions, setInstructions] = useState('Read all questions carefully and attempt all questions.\n Write clearly in black or blue ink.\n Rough work should be done on the last page.');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [sections, setSections] = useState([
    { id: 'A', numQuestions: 5, marksPerQuestion: 2, difficulty: 'Easy', type: 'Objective' },
    { id: 'B', numQuestions: 3, marksPerQuestion: 5, difficulty: 'Medium', type: 'Subjective' },
    { id: 'C', numQuestions: 2, marksPerQuestion: 10, difficulty: 'Hard', type: 'Subjective' },
  ]);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const totalMarks = sections.reduce(
    (total, section) => total + section.numQuestions * section.marksPerQuestion,
    0
  );

  const handleSectionChange = (sectionId: string, field: string, value: string | number) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    );
  };

  const handleQuestionToggle = (questionId: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  const filteredQuestions = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    return dummyQuestions.filter(
      (q) =>
        q.class === selectedClass &&
        q.subject === selectedSubject &&
        q.difficulty === section?.difficulty &&
        q.type === section?.type
    ).slice(0, section?.numQuestions); // Limit based on section configuration
  };

const handleDownload = async () => {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const logoUrl = '/logo.png'; // Replace with your logo's URL
    const logoImageBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoImageBytes);

    let page = pdfDoc.addPage([595, 842]);
    const { height, width } = page.getSize();

    // Watermark on each page
    const addWatermark = (page: PDFPage) => {
        const watermarkText = "KIIT UNIVERSITY";
        const watermarkFontSize = 50;
        const opacity = 0.1; // Adjust for desired transparency
        const angle = Math.atan2(height, width) * (180 / Math.PI); // Diagonal angle

        page.drawText(watermarkText, {
            x: width / 4,
            y: height / 2,
            size: watermarkFontSize,
            font: fontBold,
            color: rgb(0.75, 0.75, 0.75),
            opacity: opacity,
            rotate: degrees(angle) // Corrected rotation
        });
    };

    // Add watermark to first page
    addWatermark(page);

    const logoDims = logoImage.scale(0.04);
    page.drawImage(logoImage, {
        x: 50,
        y: height - 60,
        width: logoDims.width,
        height: logoDims.height,
    });

    // Header Section
    page.drawText("KIIT University", {
        x: width / 2 - 50,
        y: height - 50,
        size: 18,
        font: fontBold,
    });

    page.drawText("Mid-Semester Examination", {
        x: width / 2 - 50,
        y: height - 70,
        size: 14,
        font: fontBold,
    });

    page.drawText(`Class: ${selectedClass}`, { x: 50, y: height - 100, size: 12, font });
    page.drawText(`Subject: ${selectedSubject}`, { x: 150, y: height - 100, size: 12, font });
    page.drawText(`Full Marks: ${totalMarks}`, { x: width - 100, y: height - 100, size: 12, font });

    // Draw Line Below Header Section
    drawDynamicLine(page, height - 110, width);

    // Instructions Section
    let yPos = height - 130;
    page.drawText("Instructions:", { x: 50, y: yPos, size: 12, font: fontBold });
    const instructionsText = instructions.split("\n");
    instructionsText.forEach((line, index) => {
        page.drawText(`${index + 1}. ${line}`, { x: 60, y: yPos - 20 - index * 15, size: 10, font });
    });
    yPos -= 20 + instructionsText.length * 15;

    // Draw Line Below Instructions Section
    drawDynamicLine(page, yPos, width);
    yPos -= 20;

    // Sections and Questions
    sections.forEach((section) => {
        if (yPos < 100) {
            addPageWithRoughWork(pdfDoc, font, fontBold, addWatermark);
            page = pdfDoc.addPage([595, 842]);
            yPos = height - 60;
            addWatermark(page); // Add watermark to each new page
        }

        page.drawText(`Section ${section.id} (${section.numQuestions * section.marksPerQuestion} marks)`, {
            x: width / 2 - 50,
            y: yPos,
            size: 14,
            font: fontBold,
        });
        yPos -= 20;

        filteredQuestions(section.id).forEach((question, index) => {
            if (yPos < 100) {
                addPageWithRoughWork(pdfDoc, font, fontBold, addWatermark);
                page = pdfDoc.addPage([595, 842]);
                yPos = height - 60;
                addWatermark(page); // Add watermark to each new page
            }

            const questionText = `${index + 1}. ${question.text}`;
            page.drawText(questionText, { x: 60, y: yPos, size: 12, font });
            page.drawText(`(${section.marksPerQuestion} marks)`, { x: width - 100, y: yPos, size: 10, font });
            yPos -= 20;

            if (question.type === "Objective") {
                const options = question.options || ["Option A", "Option B", "Option C", "Option D"];
                options.forEach((option, optIndex) => {
                    page.drawText(`${String.fromCharCode(65 + optIndex)}. ${option}`, { x: 80, y: yPos, size: 10, font });
                    yPos -= 15;
                });
            }
        });
        yPos -= 20;
    });

    // Consistent Space for Rough Work
    const roughWorkHeight = 100;
    yPos -= roughWorkHeight;
    page.drawText("Space for Rough Work", { x: 50, y: yPos - 20, size: 12, font: fontBold });

    // Line Above Rough Work Section
    drawDynamicLine(page, yPos, width);

    // Page Number
    page.drawText(`Page ${pdfDoc.getPageCount()}`, {
        x: width - 100,
        y: 30,
        size: 10,
        font,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${examName}_Question_Paper.pdf`;
    link.click();
};

// Function to add a new page with rough work section and watermark
const addPageWithRoughWork = (pdfDoc: PDFDocument, font: PDFFont, fontBold: PDFFont, addWatermark: (page: PDFPage) => void) => {
    const page = pdfDoc.addPage([595, 842]);
    const { height, width } = page.getSize();

    addWatermark(page); // Add watermark to each new page

    const roughWorkHeight = 100;
    const yPos = height - roughWorkHeight;

    page.drawText("Space for Rough Work", { x: 50, y: yPos - 20, size: 12, font: fontBold });

    // Draw Line Above Rough Work Section
    drawDynamicLine(page, yPos, width);

    // Page Number
    page.drawText(`Page ${pdfDoc.getPageCount()}`, {
        x: width - 100,
        y: 30,
        size: 10,
        font,
    });
};

// Utility function to draw a dynamic line
const drawDynamicLine = (page: PDFPage, yPosition: number, pageWidth: number) => {
    page.drawLine({
        start: { x: 50, y: yPosition },
        end: { x: pageWidth - 50, y: yPosition },
        thickness: 1,
        color: rgb(0, 0, 0),
    });
};








  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/3 bg-white p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Book className="mr-2" /> Question Paper Generator
        </h1>

        <div className="space-y-6">
          <div>
            <Label htmlFor="exam-name">Exam Name</Label>
            <Input
              id="exam-name"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              placeholder="Enter exam name"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="rough-space"
              checked={includeRoughSpace}
              onCheckedChange={(checked) => setIncludeRoughSpace(checked === true)}
            />
            <Label htmlFor="rough-space">Include Rough Space</Label>
          </div>

          <div>
            <Label htmlFor="header-text">Header Text</Label>
            <Input
              id="header-text"
              value={headerText}
              onChange={(e) => setHeaderText(e.target.value)}
              placeholder="Enter header text"
            />
          </div>

          <div>
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter instructions"
            />
          </div>

          <div>
            <Label htmlFor="class-select">Class</Label>
            <Select onValueChange={setSelectedClass} value={selectedClass}>
              <SelectTrigger id="class-select">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject-select">Subject</Label>
            <Select onValueChange={setSelectedSubject} value={selectedSubject}>
              <SelectTrigger id="subject-select">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="English">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="automatic-mode"
              checked={isAutomaticMode}
              onCheckedChange={(checked) => setIsAutomaticMode(checked === true)}
            />
            <Label htmlFor="automatic-mode">Automatic Mode</Label>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Section Configuration</h2>
            {sections.map((section) => (
              <Card key={section.id} className="mb-4">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-2">Section {section.id}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`num-questions-${section.id}`}>Number of Questions</Label>
                      <Input
                        id={`num-questions-${section.id}`}
                        type="number"
                        value={section.numQuestions}
                        onChange={(e) =>
                          handleSectionChange(section.id, 'numQuestions', parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor={`marks-per-question-${section.id}`}>Marks per Question</Label>
                      <Input
                        id={`marks-per-question-${section.id}`}
                        type="number"
                        value={section.marksPerQuestion}
                        onChange={(e) =>
                          handleSectionChange(section.id, 'marksPerQuestion', parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor={`difficulty-${section.id}`}>Difficulty</Label>
                      <Select
                        onValueChange={(value) => handleSectionChange(section.id, 'difficulty', value)}
                        value={section.difficulty}
                      >
                        <SelectTrigger id={`difficulty-${section.id}`}>
                          <SelectValue placeholder="Select Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`type-${section.id}`}>Question Type</Label>
                      <Select
                        onValueChange={(value) => handleSectionChange(section.id, 'type', value)}
                        value={section.type}
                      >
                        <SelectTrigger id={`type-${section.id}`}>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Objective">Objective</SelectItem>
                          <SelectItem value="Subjective">Subjective</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 flex justify-between items-center shadow-md">
          <p className="text-lg font-semibold">Total Marks: {totalMarks}</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleDownload}>
                  <Download className="mr-2" /> Download PDF
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate and download the question paper as PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {sections.map((section) => (
          <Card key={section.id} className="mb-6">
            <CardContent>
              <h3 className="text-xl font-semibold mb-4">Section {section.id}</h3>
              {filteredQuestions(section.id).map((question) => (
                <div key={question.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex items-start">
                    {!isAutomaticMode && (
                      <Checkbox
                        id={`question-${question.id}`}
                        checked={selectedQuestions.includes(question.id)}
                        onCheckedChange={() => handleQuestionToggle(question.id)}
                        className="mt-1 mr-2"
                      />
                    )}
                    <div>
                      <p className="font-medium">{question.text}</p>
                      <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                        <span>Marks: {question.marks}</span>
                        <span>Difficulty: {question.difficulty}</span>
                        <span>Type: {question.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
