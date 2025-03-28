/**
 * Utility functions for handling file operations
 */

import { WordPressPost } from './wordpress';

/**
 * Extract file URL from WordPress post data
 * @param post - WordPress post object
 * @returns URL of the file to download or null if no file is available
 */
export function getFileUrlFromPost(post: WordPressPost): string | null {
  // First check if there's a file attachment in ACF fields
  if (post.acf?.file_attachment) {
    return post.acf.file_attachment;
  }
  
  // Check if there's a file URL in the content (prioritize document files)
  if (post.content?.rendered) {
    // Try to extract document links from content (PDF, DOC, DOCX, etc.)
    const docLinkMatch = post.content.rendered.match(/href=["']([^"']+\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt))["']/i);
    if (docLinkMatch && docLinkMatch[1]) {
      return docLinkMatch[1];
    }
    
    // Look for WordPress upload URLs which might contain documents
    const wpUploadMatch = post.content.rendered.match(/href=["']([^"']+\/wp-content\/uploads\/[^"']+\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt))["']/i);
    if (wpUploadMatch && wpUploadMatch[1]) {
      return wpUploadMatch[1];
    }
    
    // More general WordPress upload URLs as fallback
    const generalUploadMatch = post.content.rendered.match(/href=["']([^"']+\/wp-content\/uploads\/[^"']+)["']/i);
    if (generalUploadMatch && generalUploadMatch[1]) {
      return generalUploadMatch[1];
    }
  }
  
  // Fallback to featured media only if no document links found
  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    // Check if the featured media URL points to a document
    const mediaUrl = post._embedded['wp:featuredmedia'][0].source_url;
    if (/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt)$/i.test(mediaUrl)) {
      return mediaUrl;
    }
  }
  
  return null;
}

/**
 * Download a file from a URL
 * @param url - URL of the file to download
 * @param filename - Name to save the file as
 */
export function downloadFile(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  
  // Check if the URL is likely an image file
  const isImageFile = /\.(jpe?g|png|gif|bmp|webp|svg)$/i.test(url);
  
  if (isImageFile) {
    // For image files, open in a new tab instead of downloading
    link.target = '_blank';
  } else {
    // For document files, set download attribute
    link.download = filename || 'download';
  }
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}