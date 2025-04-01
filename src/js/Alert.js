export class Alert {
    constructor(alert) {
            this.alert = alert;
            this.path = `../json/Alerts.json`;
          }
    

    async fetchAlerts() {
        try {
            const response = await fetch(this.path);
            const alerts = await response.json();
            return alerts;
        } catch (error) {
            console.error("Error fetching alerts:", error);
            return [];
        }
    }

    async displayAlerts() {
        const alerts = await this.fetchAlerts();
        if (alerts.length > 0) {
            const alertSection = document.createElement("section");
            alertSection.className = "alert-list";

            alerts.forEach(alert => {
                const alertParagraph = document.createElement("p");
                alertParagraph.textContent = alert.message;
                alertParagraph.style.backgroundColor = alert.backgroundColor;
                alertParagraph.style.color = alert.foregroundColor;
                alertSection.appendChild(alertParagraph);
            });

            document.body.appendChild(alertSection);
        }
    }
}

