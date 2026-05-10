<?php

namespace App\Filament\Resources\JobPostings\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class JobPostingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title_ar')
                    ->required(),
                TextInput::make('title_en')
                    ->required(),
                Textarea::make('description_ar')
                    ->columnSpanFull(),
                Textarea::make('description_en')
                    ->columnSpanFull(),
                Textarea::make('requirements_ar')
                    ->columnSpanFull(),
                Textarea::make('requirements_en')
                    ->columnSpanFull(),
                TextInput::make('location_ar'),
                TextInput::make('location_en'),
                TextInput::make('type'),
                TextInput::make('salary_range'),
                Toggle::make('is_active')
                    ->required(),
                DateTimePicker::make('expires_at'),
            ]);
    }
}
