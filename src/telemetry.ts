import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { PrismaInstrumentation } from "@prisma/instrumentation";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";

function setupTelemetry() {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "leto_prod"
    })
  });

  // Setup how spans are processed and exported. In this case we're sending spans
  // as we receive them to an OTLP-compatible collector (e.g. Jaeger).
  provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter()));

  // Register your auto-instrumentors
  registerInstrumentations({
    instrumentations: [new PrismaInstrumentation()],
    tracerProvider: provider
  });

  provider.register();
  // eslint-disable-next-line no-console
  console.log("📈 Telemetry set up");
}

export default setupTelemetry;
