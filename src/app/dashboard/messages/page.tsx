"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store";
import { Pencil, Search, Send } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

// Interface untuk data pesan
interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  };
  timestamp: string;
  isRead: boolean;
}

// Interface untuk data kontak
interface Contact {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}

// Data sampel untuk kontak
const sampleContacts: Contact[] = [
  {
    id: "contact-1",
    name: "Budi Santoso",
    role: "Guru Pembimbing",
    lastMessage: "Tolong kirimkan laporan minggu ini ya",
    lastMessageTime: "2025-09-02T10:30:00",
    unreadCount: 1
  },
  {
    id: "contact-2",
    name: "Dian Permata",
    role: "Pembimbing Industri",
    lastMessage: "Besok jangan lupa meeting jam 9",
    lastMessageTime: "2025-09-01T16:45:00",
    unreadCount: 0
  },
  {
    id: "contact-3",
    name: "Ahmad Fauzi",
    role: "Koordinator PKL",
    lastMessage: "Dokumen pengajuan sudah disetujui",
    lastMessageTime: "2025-08-30T14:20:00",
    unreadCount: 0
  },
  {
    id: "contact-4",
    name: "Siti Rahayu",
    role: "Admin PKL",
    lastMessage: "Silakan ambil surat keterangan di ruang TU",
    lastMessageTime: "2025-08-28T09:15:00",
    unreadCount: 0
  }
];

// Data sampel untuk pesan
const sampleMessages: { [key: string]: Message[] } = {
  "contact-1": [
    {
      id: "msg-1",
      text: "Halo, bagaimana perkembangan PKL kamu?",
      sender: {
        id: "contact-1",
        name: "Budi Santoso",
        role: "Guru Pembimbing"
      },
      timestamp: "2025-09-01T09:30:00",
      isRead: true
    },
    {
      id: "msg-2",
      text: "Sejauh ini lancar, Pak. Saya sedang mengerjakan project web development.",
      sender: {
        id: "user-123",
        name: "Rizki Mahasiswa",
        role: "Siswa"
      },
      timestamp: "2025-09-01T09:35:00",
      isRead: true
    },
    {
      id: "msg-3",
      text: "Bagus, jangan lupa dokumentasikan semua yang kamu kerjakan ya.",
      sender: {
        id: "contact-1",
        name: "Budi Santoso",
        role: "Guru Pembimbing"
      },
      timestamp: "2025-09-01T09:40:00",
      isRead: true
    },
    {
      id: "msg-4",
      text: "Baik, Pak. Saya sudah mencatatnya di jurnal kegiatan.",
      sender: {
        id: "user-123",
        name: "Rizki Mahasiswa",
        role: "Siswa"
      },
      timestamp: "2025-09-01T09:45:00",
      isRead: true
    },
    {
      id: "msg-5",
      text: "Tolong kirimkan laporan minggu ini ya",
      sender: {
        id: "contact-1",
        name: "Budi Santoso",
        role: "Guru Pembimbing"
      },
      timestamp: "2025-09-02T10:30:00",
      isRead: false
    }
  ],
  "contact-2": [
    {
      id: "msg-6",
      text: "Rizki, hari ini kamu bisa bantu debugging fitur login?",
      sender: {
        id: "contact-2",
        name: "Dian Permata",
        role: "Pembimbing Industri"
      },
      timestamp: "2025-09-01T08:30:00",
      isRead: true
    },
    {
      id: "msg-7",
      text: "Bisa, Bu. Saya akan kerjakan setelah jam makan siang.",
      sender: {
        id: "user-123",
        name: "Rizki Mahasiswa",
        role: "Siswa"
      },
      timestamp: "2025-09-01T08:35:00",
      isRead: true
    },
    {
      id: "msg-8",
      text: "Terima kasih. Oh ya, besok kita ada meeting dengan tim dev jam 9 pagi.",
      sender: {
        id: "contact-2",
        name: "Dian Permata",
        role: "Pembimbing Industri"
      },
      timestamp: "2025-09-01T16:40:00",
      isRead: true
    },
    {
      id: "msg-9",
      text: "Besok jangan lupa meeting jam 9",
      sender: {
        id: "contact-2",
        name: "Dian Permata",
        role: "Pembimbing Industri"
      },
      timestamp: "2025-09-01T16:45:00",
      isRead: true
    }
  ]
};

export default function MessagesPage() {
  const { user } = useAuthStore();
  const [selectedContact, setSelectedContact] = useState<string | null>("contact-1");
  const [newMessage, setNewMessage] = useState("");
  const [contacts, setContacts] = useState(sampleContacts);
  const [messages, setMessages] = useState(sampleMessages);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = searchQuery.trim() === "" 
    ? contacts 
    : contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const currentMessages = selectedContact ? messages[selectedContact] || [] : [];

  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && 
                    date.getMonth() === now.getMonth() && 
                    date.getFullYear() === now.getFullYear();
    
    if (isToday) {
      return format(date, "HH:mm");
    } else {
      return format(date, "dd MMM, HH:mm");
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedContact) return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      text: newMessage,
      sender: {
        id: user?.id || "user-123",
        name: user?.name || "Rizki Mahasiswa",
        role: "Siswa"
      },
      timestamp: new Date().toISOString(),
      isRead: true
    };
    
    // Update pesan
    setMessages(prev => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), newMsg]
    }));
    
    // Update kontak dengan pesan terakhir
    setContacts(prev => 
      prev.map(contact => 
        contact.id === selectedContact
          ? {
              ...contact,
              lastMessage: newMessage,
              lastMessageTime: new Date().toISOString(),
            }
          : contact
      )
    );
    
    setNewMessage("");
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedContact(contactId);
    
    // Tandai semua pesan sebagai sudah dibaca
    setMessages(prev => {
      if (!prev[contactId]) return prev;
      
      return {
        ...prev,
        [contactId]: prev[contactId].map(msg => ({
          ...msg,
          isRead: true
        }))
      };
    });
    
    // Reset unreadCount untuk kontak yang dipilih
    setContacts(prev => 
      prev.map(contact => 
        contact.id === contactId
          ? { ...contact, unreadCount: 0 }
          : contact
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pesan</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
        {/* Sidebar - Daftar Kontak */}
        <div className="lg:col-span-1 border rounded-lg overflow-hidden bg-white">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari kontak..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-56px)]">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer ${
                    selectedContact === contact.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleSelectContact(contact.id)}
                >
                  <Avatar className="h-10 w-10">
                    {contact.avatar && <AvatarImage src={contact.avatar} alt={contact.name} />}
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-baseline">
                      <p className="font-medium truncate">{contact.name}</p>
                      {contact.lastMessageTime && (
                        <span className="text-xs text-gray-500">
                          {formatMessageDate(contact.lastMessageTime)}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 truncate">
                        {contact.role}
                        {contact.lastMessage && ` · ${contact.lastMessage}`}
                      </p>
                      {contact.unreadCount > 0 && (
                        <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {contact.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                Tidak ada kontak yang sesuai dengan pencarian
              </div>
            )}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="lg:col-span-2 border rounded-lg overflow-hidden flex flex-col bg-white">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    {contacts.find(c => c.id === selectedContact)?.avatar && (
                      <AvatarImage 
                        src={contacts.find(c => c.id === selectedContact)?.avatar || ""} 
                        alt={contacts.find(c => c.id === selectedContact)?.name || ""} 
                      />
                    )}
                    <AvatarFallback>
                      {contacts.find(c => c.id === selectedContact)?.name.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="font-medium">
                      {contacts.find(c => c.id === selectedContact)?.name || ""}
                    </p>
                    <p className="text-xs text-gray-500">
                      {contacts.find(c => c.id === selectedContact)?.role || ""}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender.id === (user?.id || "user-123") ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender.id === (user?.id || "user-123")
                          ? "bg-primary text-white"
                          : "bg-white border"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p 
                        className={`text-xs mt-1 ${
                          message.sender.id === (user?.id || "user-123")
                            ? "text-primary-foreground/70"
                            : "text-gray-500"
                        }`}
                      >
                        {formatMessageDate(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-3 border-t flex items-center">
                <Input
                  placeholder="Ketik pesan..."
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  className="ml-2" 
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={newMessage.trim() === ""}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <Pencil className="h-12 w-12 text-gray-300 mb-4" />
              <h2 className="text-xl font-medium mb-2">Pilih kontak untuk memulai chat</h2>
              <p className="text-gray-500">
                Pilih kontak dari daftar di sebelah kiri untuk memulai atau melanjutkan percakapan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
