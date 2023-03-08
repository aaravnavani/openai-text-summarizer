function SummarizedText() {
<div className = "summarizedText">
    <TextField
    sx={{
        width: { sm: 200, md: 300 },
        "& .MuiInputBase-root": {
            height: 100
        }
    }}
    id="summarized-text"
    name="name"
    label="Enter the text you want to summarize"
    type="text"
    value={text}
    onChange={(event) => setText(event.target.value)}
    placeholder="Text"
    />
    </div>
}