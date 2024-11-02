import tkinter as tk
import subprocess
import threading

# Initialize the global variable
process = None

tests = {
    "Get url Profile 1": "get-url-50.spec.ts",
    "Get url Profile 2": "get-url-51.spec.ts",
    "Get url Profile 3": "get-url-3.spec.ts"
}

def run_command(command):
    """Execute a shell command and update the output in the text widget."""
    global process
    output_text.delete(1.0, tk.END)  # Clear previous output

    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    threading.Thread(target=read_output, daemon=True).start()

def read_output():
    """Read output from the process and update the text widget."""
    for line in process.stdout:
        output_text.insert(tk.END, line)
        output_text.see(tk.END)  # Auto-scroll to the end
    process.stdout.close()
    process.wait()

def run_profile_1():
    test_file = tests["Get url Profile 1"]; 
    run_command(f"npx playwright test {test_file} --retries=0")

def run_profile_2():
    test_file = tests["Get url Profile 2"]; 
    run_command(f"npx playwright test {test_file} --retries=0")

def run_profile_3():
    test_file = tests["Get url Profile 3"]; 
    run_command(f"npx playwright test {test_file} --retries=0")

# Create the main window
root = tk.Tk()
root.title("Playwright Test Runner")

# Create buttons
profile_1_button = tk.Button(root, text="Profile 1", command=run_profile_1)
profile_1_button.pack(pady=10)

profile_2_button = tk.Button(root, text="Profile 2", command=run_profile_2)
profile_2_button.pack(pady=10)

profile_3_button = tk.Button(root, text="Profile 3", command=run_profile_3)
profile_3_button.pack(pady=10)

# Output area
output_text = tk.Text(root, height=15, width=50)
output_text.pack(pady=10)

# Start the GUI loop
root.mainloop()
