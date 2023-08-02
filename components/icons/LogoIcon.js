import styled from "styled-components";

const Wrapper = styled.div`
    transition: 100ms;
    &:hover{
        transform: scale(1.02);
    }
`
export default function LogoIcon() {
    return (
        
        <Wrapper>
            <svg width="100" height="50" viewBox="0 0 374 249"  fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M82.584 234.657C70.818 234.657 59.496 232.881 48.618 229.329C37.962 225.999 29.304 220.338 22.644 212.346C15.984 204.354 12.654 193.587 12.654 180.045C12.654 165.615 15.429 151.518 20.979 137.754C26.529 123.99 33.966 111.225 43.29 99.459C52.614 87.471 63.048 77.148 74.592 68.49C84.804 60.72 96.57 54.393 109.89 49.509C123.432 44.625 136.863 42.183 150.183 42.183C155.733 42.183 160.95 42.627 165.834 43.515C170.718 44.181 175.713 45.735 180.819 48.177C185.259 50.175 188.811 52.728 191.475 55.836C194.139 58.722 195.471 62.052 195.471 65.826C195.471 66.27 195.471 66.825 195.471 67.491C195.471 68.157 195.36 68.712 195.138 69.156C194.25 72.708 192.141 76.815 188.811 81.477C185.703 85.917 183.261 90.579 181.485 95.463C181.263 96.351 180.042 97.128 177.822 97.794C175.602 98.238 174.714 98.016 175.158 97.128C176.934 94.242 178.266 90.69 179.154 86.472C180.264 82.254 180.819 78.036 180.819 73.818C180.819 70.71 180.486 67.824 179.82 65.16C179.376 62.274 178.488 59.832 177.156 57.834C174.936 53.838 171.495 51.063 166.833 49.509C162.171 47.955 157.176 47.178 151.848 47.178C146.742 47.178 141.636 47.733 136.53 48.843C131.424 49.953 126.984 51.174 123.21 52.506C110.334 57.168 98.013 64.494 86.247 74.484C75.813 83.586 66.489 94.131 58.275 106.119C50.283 118.107 43.956 130.428 39.294 143.082C34.632 155.736 32.301 167.835 32.301 179.379C32.301 191.145 34.854 200.469 39.96 207.351C45.066 214.233 51.726 219.117 59.94 222.003C68.154 224.889 77.034 226.332 86.58 226.332C95.016 226.332 103.341 225.444 111.555 223.668C119.991 221.892 127.65 219.672 134.532 217.008C146.298 212.568 156.843 207.129 166.167 200.691C175.713 194.253 184.593 185.928 192.807 175.716C193.917 174.606 194.694 174.051 195.138 174.051C195.804 174.051 196.137 174.495 196.137 175.383C196.137 177.159 195.249 179.268 193.473 181.71C185.925 191.922 177.378 200.469 167.832 207.351C158.286 214.233 148.074 219.894 137.196 224.334C129.87 227.22 121.323 229.662 111.555 231.66C102.009 233.658 92.352 234.657 82.584 234.657ZM236.211 226.998C232.881 226.998 229.884 226.332 227.22 225C224.778 223.668 223.557 221.226 223.557 217.674C223.557 215.676 224.001 213.456 224.889 211.014C226.887 205.908 229.551 199.692 232.881 192.366C236.433 185.04 239.985 177.936 243.537 171.054C247.089 163.95 249.864 158.178 251.862 153.738C253.194 151.074 253.86 149.187 253.86 148.077C253.86 146.079 252.75 145.635 250.53 146.745C248.31 147.855 245.868 149.409 243.204 151.407C240.54 153.405 238.542 154.959 237.21 156.069C231.438 161.397 225.333 167.724 218.895 175.05C212.679 182.154 206.907 189.702 201.579 197.694C196.473 205.464 192.477 213.234 189.591 221.004C189.369 222.336 187.926 223.446 185.262 224.334C182.598 225.222 180.156 225.666 177.936 225.666C174.384 225.666 173.052 224.556 173.94 222.336C179.046 210.792 184.263 198.027 189.591 184.041C195.141 170.055 201.357 155.736 208.239 141.084C213.345 129.984 219.006 118.551 225.222 106.785C231.66 95.019 238.764 83.808 246.534 73.152C254.304 62.274 262.851 52.728 272.175 44.514C280.389 37.41 289.38 31.638 299.148 27.198C309.138 22.536 319.905 20.205 331.449 20.205C336.555 20.205 340.995 21.315 344.769 23.535C348.543 25.533 350.652 29.196 351.096 34.524V37.521C351.096 40.629 350.763 43.737 350.097 46.845C349.875 47.733 348.987 48.177 347.433 48.177C346.767 48.177 346.545 48.066 346.767 47.844C347.655 42.072 346.101 37.965 342.105 35.523C338.331 33.081 333.447 31.86 327.453 31.86C316.575 31.86 306.585 33.858 297.483 37.854C288.381 41.85 279.945 47.178 272.175 53.838C260.187 64.272 249.753 77.592 240.873 93.798C231.993 110.004 224.334 126.543 217.896 143.415C214.788 151.629 211.68 159.843 208.572 168.057C205.686 176.271 202.911 183.93 200.247 191.034C210.237 177.714 219.783 166.281 228.885 156.735C238.209 147.189 246.312 140.418 253.194 136.422C258.744 133.314 263.739 131.76 268.179 131.76C272.397 131.76 274.506 133.536 274.506 137.088C274.506 140.196 272.952 144.192 269.844 149.076C268.29 151.518 265.848 155.625 262.518 161.397C259.41 167.169 256.08 173.496 252.528 180.378C249.198 187.038 246.312 193.254 243.87 199.026C241.428 204.798 240.207 209.016 240.207 211.68C240.207 215.232 241.761 217.008 244.869 217.008C246.645 217.008 248.643 216.453 250.863 215.343C253.305 214.233 255.081 213.234 256.191 212.346C262.185 207.906 268.068 202.467 273.84 196.029C279.612 189.591 284.496 183.93 288.492 179.046C288.714 178.824 288.825 179.157 288.825 180.045C288.825 180.933 288.603 182.265 288.159 184.041C287.937 185.595 287.271 186.927 286.161 188.037C283.719 191.367 281.166 194.586 278.502 197.694C276.06 200.58 273.618 203.466 271.176 206.352C266.958 211.236 261.852 215.898 255.858 220.338C250.086 224.778 243.537 226.998 236.211 226.998Z" fill="white"/>
            </svg>
        </Wrapper>
    );
  }