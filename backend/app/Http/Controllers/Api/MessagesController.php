<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;

class MessagesController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:200',
            'message' => 'required|string|max:2000',
            'service_type' => 'nullable|string|max:100',
            'lang' => 'nullable|in:ar,en',
        ]);

        foreach ($validated as $key => $value) {
            if (is_string($value)) {
                $validated[$key] = strip_tags(trim($value));
            }
        }

        $lang = $validated['lang'] ?? 'ar';

        Message::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'subject' => $validated['subject'] ?? null,
            'message' => $validated['message'],
            'service_type' => $validated['service_type'] ?? null,
            'lang' => $lang,
        ]);
        return response()->json([
            'success' => true,
            'message' => $lang === 'ar'
                ? 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً'
                : 'Your message has been sent successfully, we will contact you soon',
        ], 201);
    }

    public function apply(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'job_title' => 'nullable|string|max:255',
            'message' => 'required|string|min:10',
        ]);

        foreach ($validated as $key => $value) {
            if (is_string($value)) {
                $validated[$key] = strip_tags(trim($value));
            }
        }

        Message::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'subject' => $validated['job_title'] ?? 'Job Application',
            'message' => $validated['message'],
            'service_type' => 'job_application',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your application has been submitted successfully.',
        ], 201);
    }
}
