
export const getCookie =(name:string) => {
    const value = `; ${document.cookie}`;
    const parts:any = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  
  }


  export function extractKeywords(paragraph:string, count = 50) {
    // Step 1: Split the paragraph by spaces and get the words.
    const words = paragraph.split(/\s+/); // Split by one or more spaces
  
    // Step 2: Get the first 50 words.
    let keywords = '';
    for (let i = 0; i < Math.min(count, words.length); i++) {
      keywords += words[i] + ' ';  // Add each word followed by a space
    }
  
    // Step 3: Return the result, trimming any extra space at the end.
    return keywords.trim();
  }
