interface JobSearchBarProps{
	keyword: string;
	location: string;
	onKeywordChange: (value: string) => void;
	onLocationChange: (value: string) => void;
}

export default function JobSearchBar({keyword,
												 location,
												 onKeywordChange, 
												 onLocationChange} : JobSearchBarProps){
	 return (
    <div className="grid gap-3 md:grid-cols-2">

      <input
        value={keyword}
        onChange={(e) =>
          onKeywordChange(e.target.value)
        }
        placeholder="Job title or keyword"
        className="rounded-lg border p-3"
      />

      <input
        value={location}
        onChange={(e) =>
          onLocationChange(e.target.value)
        }
        placeholder="Location"
        className="rounded-lg border p-3"
      />

    </div>
  );

}